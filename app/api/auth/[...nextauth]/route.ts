import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth";

// Use the authConfig from lib/auth.ts to ensure consistency
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST }