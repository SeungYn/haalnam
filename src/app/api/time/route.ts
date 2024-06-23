import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/db';
import { getNowDate, getNowYYYY_MM_DD } from '@/utils/date';
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

  // time를 하나 만들때 user 상태도 변경시켜 줘야함.
  const res = client.$transaction(async () => {
    const post = await client.time.create({
      data: {
        userId: id,
        status: status,
        subject: subject,
        time: getNowDate(),
      },
    });
    await client.user.update({
      where: { id },
      data: {
        timer_status: status,
      },
    });

    return post;
  });
  console.log(time);
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
  const today = getNowYYYY_MM_DD();

  const tomorrow = new Date(
    getNowYYYY_MM_DD().setDate(getNowYYYY_MM_DD().getDate() + 1)
  );

  //console.log(new Date(), today, tomorrow, id);
  let times;
  try {
    times = await client.time.findMany({
      where: {
        time: {
          gte: today,
          lte: tomorrow,
        },
        userId: id,
      },
    });
  } catch (e) {
    console.error(e);
  }

  return NextResponse.json(times, { status: 200 });
}
