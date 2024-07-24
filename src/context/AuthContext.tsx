import { auth } from '@/lib/auth';
import { SessionProvider, useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

type Prop = {};

export async function AuthContext({ children }: PropsWithChildren<Prop>) {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
