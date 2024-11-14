import NextAuth from "next-auth";
import { nextAuthOptions } from "./auth-options";

export const { handlers: { GET, POST } } = NextAuth(nextAuthOptions);
