import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import authConfig from './auth.config';

import {} from 'next-auth/jwt';
import { Business, Startup } from '@prisma/client';

declare module 'next-auth/jwt' {
  interface JWT {
    type: string;
    isOAuth: boolean;
    hasPassword: boolean;
    email?: string | null;
    phoneNumber?: string | null;
    business: Business | null;
    startup: Startup | null;
    name: string;
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
      business: Business | null;
      startup: Startup | null;
      name: string;
    } & DefaultSession['user'];
  }
}

const prisma = new PrismaClient();

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

      const business = await prisma.business.findFirst({
        where: {
          userId: token.sub,
        },
      });

      const startup = await prisma.startup.findFirst({
        where: {
          userId: token.sub,
        },
      });

      token.isOAuth = !!existingAccount;
      token.hasPassword = !!existingUser.password;
      token.email = existingUser.email;
      token.phoneNumber = existingUser.phoneNumber;
      token.type = existingUser.type;
      token.business = business;
      token.startup = startup;

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

      if (token.business && session.user) {
        session.user.business = token.business;
      }

      if (token.startup && session.user) {
        session.user.startup = token.startup;
      }

      return session;
    },
  },
});
