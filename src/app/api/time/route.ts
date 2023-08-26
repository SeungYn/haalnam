import { getServerSession } from 'next-auth';
import { nextOptions } from '../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/db';
import { getNowDate } from '@/utils/date';
import { Status } from '@prisma/client';

export async function POST(request: NextRequest) {
  const session = await getServerSession(nextOptions);
  if (!session)
    return new NextResponse('Authentication Error', { status: 401 });
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
