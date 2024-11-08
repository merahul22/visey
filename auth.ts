import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import {
  Achievement,
  Opportunity,
  PrismaClient,
  Services,
} from '@prisma/client';
import authConfig from './auth.config';
import {} from 'next-auth/jwt';
import { Business, Startup } from '@prisma/client';

declare module 'next-auth/jwt' {
  interface JWT {
    type?: string | null;
    isOAuth: boolean;
    hasPassword: boolean;
    email?: string | null;
    phoneNumber?: string | null;
    business:
      | (Business & {
          services: Services[];
          achievements: Achievement[];
          opportunities: Opportunity[];
        })
      | null;
    startup: Startup | null;
    name: string;
    preferences: string[];
    createdAt: Date;
  }
}

declare module 'next-auth' {
  interface User {
    type?: 'BUSINESS' | 'STARTUP' | null;
  }

  interface Session {
    user: {
      type: string;
      isOAuth: boolean;
      hasPassword: boolean;
      email: string;
      phoneNumber: string;
      business:
        | (Business & {
            services: Services[];
            achievements: Achievement[];
            opportunities: Opportunity[];
          })
        | null;
      startup: Startup | null;
      name: string;
      preferences: string[];
      createdAt: Date;
    } & DefaultSession['user'];
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser {
    type?: 'BUSINESS' | 'STARTUP' | null;
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
  trustHost: true,
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
        include: {
          services: true,
          achievements: true,
          opportunities: true,
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
      token.preferences = existingUser.preferences;
      token.createdAt = existingUser.createdAt;

      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.type && session.user) {
        session.user.type = token.type as 'BUSINESS' | 'STARTUP';
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

      if (token.preferences && session.user) {
        session.user.preferences = token.preferences;
      }

      if (token.createdAt && session.user) {
        session.user.createdAt = token.createdAt;
      }

      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { id: true, type: true },
        });

        if (existingUser?.type) {
          user.type = existingUser.type;
          return true;
        }
      }
      return true;
    },
  },
  events: {
    async linkAccount({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { type: true },
      });

      if (!existingUser?.type) {
        user.type = null;
      } else {
        user.type = existingUser.type;
      }
    },
  },
});
