import client from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { AuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import KakaoProvider from 'next-auth/providers/kakao';

const prisma = new PrismaClient();

const nextOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_ID || ``,
      clientSecret: process.env.KAKAO_SECRET || ``,
    }),
  ],
};

const handler = NextAuth(nextOptions);

export { handler as GET, handler as POST };
