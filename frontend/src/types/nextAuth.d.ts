import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** O token do usuário */
      token: string;
    } & DefaultSession["user"];
  }
}
