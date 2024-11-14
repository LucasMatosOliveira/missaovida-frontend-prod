import NextAuth from "next-auth";
import { nextAuthOptions } from "./auth-options";

export const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };