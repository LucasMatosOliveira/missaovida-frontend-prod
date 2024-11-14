import NextAuth from "next-auth";
import { nextAuthOptions } from "./auth-options";

const handlers = NextAuth(nextAuthOptions);

export const GET = handlers.handlers.GET;
export const POST = handlers.handlers.POST;
