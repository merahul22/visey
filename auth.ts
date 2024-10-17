import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './lib/db';
import authConfig from './auth.config';
import { parseCookies } from 'nookies';

import {} from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    type: string;
    isOAuth: boolean;
    hasPassword: boolean;
    email?: string | null;
    phoneNumber?: string | null;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      type: string;
      isOAuth: boolean;
      hasPassword: boolean;
      email: string;
      phoneNumber: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const cookies = parseCookies();

      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (!existingUser) {
        return token;
      }

      const existingAccount = await prisma.account.findFirst({
        where: {
          userId: token.sub,
        },
      });

      if (cookies.type) {
        token.type = cookies.type;
      } else {
        token.type = existingUser.type;
      }
      token.isOAuth = !!existingAccount;
      token.hasPassword = !!existingUser.password;
      token.email = existingUser.email;
      token.phoneNumber = existingUser.phoneNumber;

      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.type && session.user) {
        session.user.type = token.type;
      }

      if (token.email && session.user) {
        session.user.email = token.email;
      }

      if (token.phoneNumber && session.user) {
        session.user.phoneNumber = token.phoneNumber;
      }

      if (token.isOAuth && session.user) {
        session.user.isOAuth = token.isOAuth;
      }

      if (token.hasPassword && session.user) {
        session.user.hasPassword = token.hasPassword;
      }

      return session;
    },
  },
});
