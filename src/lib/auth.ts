import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { NextAuthConfig } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import KakaoProvider from 'next-auth/providers/kakao';

const prisma = new PrismaClient();

export const nextOptions: NextAuthConfig = {
  // 타입 Adapter를 명시해 줘야함
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_ID || ``,
      clientSecret: process.env.KAKAO_SECRET || ``,
    }),
  ],
  callbacks: {
    async signIn(context) {
      // signIn이 session보다 먼저 호출 됨
      //console.log(context, 'context signin', context.user.id);
      return true;
    },
    async session({ session, token, user: test }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const user = session?.user;
      //console.log(user, token, test, 'usesession');
      if (user) {
        session.user = {
          ...user,
          id: token.sub!,
        };
      }

      return session;
    },
    async jwt(context) {
      //console.log(context, 'console.log context');
      //console.log(context.user, 'context user');
      //console.log(context, 'token');
      return context.token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(nextOptions);

export const {
  handlers: { GET, POST },
  auth,
} = handler;
