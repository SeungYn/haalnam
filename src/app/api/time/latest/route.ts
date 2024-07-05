import { auth } from '@/lib/auth';
import client from '@/lib/db';
import { getNowYYYY_MM_DD } from '@/utils/date';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  //console.log('postsession', session);
  if (!session)
    return new NextResponse('Authentication Error ee', { status: 401 });
  const { id } = session.user;

  let time = await client.time.findMany({
    where: {
      time: {
        equals: getNowYYYY_MM_DD(),
      },
      userId: id,
    },
  });

  return NextResponse.json(time, { status: 200 });
}
