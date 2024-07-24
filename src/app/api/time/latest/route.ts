import { auth } from '@/lib/auth';
import client from '@/lib/db';
import { getLatestTime } from '@/service/server/timeServerService';

import { getNowDate, getNowYYYY_MM_DD } from '@/utils/date';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  //console.log('postsession', session);
  if (!session)
    return new NextResponse('Authentication Error ee', { status: 401 });
  const { id } = session.user;

  let time = await getLatestTime(id);

  return NextResponse.json(time, { status: 200 });
}
