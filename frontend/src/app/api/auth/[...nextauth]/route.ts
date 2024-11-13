import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                username: { label: 'username', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials?.username || !credentials?.password) {
                        throw new Error('Credenciais ausentes');
                    }

                    const response = await fetch('http://189.126.111.132:8001/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: credentials.username,
                            password: credentials.password
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Falha na autenticação');
                    }

                    const data = await response.json();

                    return {
                        id: data.id,
                        token: data.token,
                        username: credentials.username,
                    };
                } catch (error) {
                    console.error('Erro durante a autorização:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/dashboard'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as any;
            return session;
        },
    }
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
