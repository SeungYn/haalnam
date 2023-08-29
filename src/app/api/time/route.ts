import { getServerSession } from 'next-auth';
import { nextOptions } from '../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/db';
import { getNowDate } from '@/utils/date';
import { Status } from '@prisma/client';

export async function POST(request: NextRequest) {
  const session = await getServerSession(nextOptions);
  if (!session)
    return new NextResponse('Authentication Error ee', { status: 401 });
  const { id } = session.user;

  const formData = await request.formData();
  const subject = formData.get('subject') as string;
  const status = formData.get('status') as Status;

  const res = await client.time.create({
    data: {
      userId: id,
      status: status,
      subject: subject,
      time: getNowDate(),
    },
  });

  return NextResponse.json(res, { status: 200 });
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(nextOptions);

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
