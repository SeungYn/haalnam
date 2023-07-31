'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

type Prop = {};

export function AuthContext({ children }: PropsWithChildren<Prop>) {
  return <SessionProvider>{children}</SessionProvider>;
}
