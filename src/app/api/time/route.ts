import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/db';
import { getNowDate } from '@/utils/date';
import { Status } from '@prisma/client';
import { auth } from '@/lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(request: NextRequest, response: NextResponse) {
  const session = await auth();

  if (!session)
    return new NextResponse('Authentication Error ee', { status: 401 });
  const { id } = session.user;

  const formData = await request.formData();
  const subject = formData.get('subject') as string;
  const status = formData.get('status') as Status;
  const time = formData.get('time');

  const res = await client.time.create({
    data: {
      userId: id,
      status: status,
      subject: subject,
      time: getNowDate(),
    },
  });

  // 클라에서 보낸 time은 그대로 보내야됨 UTC + 9 이기 때문
  //console.log(res);
  return NextResponse.json({ ...res, time }, { status: 200 });
}

export async function GET(request: NextApiRequest, res: NextApiResponse) {
  const session = await auth();
  //console.log('postsession', session);
  if (!session)
    return new NextResponse('Authentication Error ee', { status: 401 });
  const { id } = session.user;

  // UTC 기준 시간 설정
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getDate() + 1);

  //console.log(new Date(), today, tomorrow, id);
  let times;
  try {
    times = await client.time.findMany({
      where: {
        time: {
          gte: today,
          lt: tomorrow,
        },
        userId: id,
      },
    });
  } catch (e) {
    console.error(e);
  }

  return NextResponse.json(times, { status: 200 });
}
