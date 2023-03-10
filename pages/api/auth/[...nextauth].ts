import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { login } from "@/modules/users/user.controller";
import { LoginDto } from "@/modules/users/dto/login.dto";
import { dbConnect } from "@/config/database";
import * as _ from "lodash";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        await dbConnect()
        const user = await login(credentials as LoginDto)
        if (!user) {
          throw user
        }
        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },

    session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/"
  },
};

export default NextAuth(authOptions);
