import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/app/db";
import crypto from "crypto";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
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
              name: profile?.name,
              //@ts-ignore
              profilePicture: profile?.picture,
              provider: "Google",
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
});

export { handler as GET, handler as POST }
console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)