import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import crypto from "crypto";
import { prisma } from "@/app/db";
import { JWT } from "next-auth/jwt";
import { Account, User } from "next-auth";

export interface CustomSession extends Session {
    user: {
        email: string;
        name: string;
        image: string;
        uid: string;
    };
}

export const authConfig = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
      })
    ],
    callbacks: {
        session: ({session, token}: any) => {
            if (session.user && token.uid) {
                session.user.uid = token.uid;
            }
            return session;
        },
        async jwt({token, account, user}: {token: JWT, account: Account | null, user: User | null}) {
            if (account && user && user.email) {
                // Only try to find user when account is available (during sign in)
                const dbUser = await prisma.user.findFirst({
                    where: {
                        email: user.email
                    }
                });
                
                if (dbUser) {
                    token.uid = dbUser.id;
                }
            }
            return token;
        },
        async signIn({ user, account, profile }: any) {
        try {
          if (account?.provider === "google") {
            const email = user.email;
            if (!email) {
              console.error("No email provided by Google");
              return false;
            }
  
            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
              where: {
                email: email
              }
            });
  
            if (existingUser) {
              return true;
            }
  
            // Generate wallet keys using Node.js crypto
            const publicKey = crypto.randomBytes(32).toString('hex');
            const privateKey = crypto.randomBytes(64).toString('hex');
            
            // Create new user with wallets
            await prisma.user.create({
              data: {
                username: email,
                email: email,
                name: profile?.name || user.name || email,
                //@ts-ignore
                profilePicture: profile?.picture || user.image,
                provider: "Google",
                sub: account.providerAccountId || "",
                solWallet: {
                  create: {
                    publicKey: publicKey,
                    privateKey: privateKey
                  }
                },
                inrWallet: {
                  create: {
                    balance: 0
                  }
                }
              }
            });
            
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
    },
    pages: {
      error: '/auth/error'
    }
  };