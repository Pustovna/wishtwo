import NextAuth, { Session } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/schemas/LoginSchema";

declare module "next-auth" {
  interface Session {
    token: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "identifier",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;

          const res = await fetch("http://localhost:1337/api/auth/local", {
            method: "POST",
            body: JSON.stringify({ identifier: email, password: password }),
            headers: { "Content-Type": "application/json" },
          });

          const user = await res.json();

          if (!res || user.error) {
            return null;
          }

          const userWithJwt = {
            ...user.user,
            name: user.user.username,
            jwt: user.jwt,
          };

          return userWithJwt;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, session }) {
      if (user && 'jwt' in user) {
        token.jwt = user.jwt;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.user.id = token.sub as string;
      }
      if (token && token.jwt) {
        session.token = token.jwt as unknown as string;
      }

      return session;
    },
  },
});
