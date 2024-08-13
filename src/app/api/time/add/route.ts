import { auth } from '@/lib/auth';
import client from '@/lib/db';
import { checkUser } from '@/service/server/userServerService';
import { PostAddTimerRequest } from '@/service/types/time';
import { makeUTCStringDate } from '@/utils/date';
import { ExceptionRes } from '@/utils/exception';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const session = await auth();

	let user: User | null;
	try {
		user = await checkUser(session?.user?.id, session);
	} catch {
		return NextResponse.json(
			{ message: '유저 정보가 올바르지 않습니다.' },
			{ status: 401 }
		);
	}

	let reqData: PostAddTimerRequest;

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	const { startTime, subject, endTime, date } = reqData;

	const startDate = makeUTCStringDate(
		date.y,
		date.m,
		date.d,
		startTime.hours,
		startTime.minutes
	);
	const endDate = makeUTCStringDate(
		date.y,
		date.m,
		date.d,
		endTime.hours,
		endTime.minutes
	);
	try {
		await client.time.createMany({
			data: [
				{
					subject,
					status: 'START',
					time: startDate,
					userId: user.id,
				},
				{
					subject,
					status: 'END',
					time: endDate,
					userId: user.id,
				},
			],
		});
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			new ExceptionRes('오류가 발생했습니다. 다시 시도해주세요'),
			{ status: 500 }
		);
	}

	return NextResponse.json({ dd: '굿' }, { status: 201 });
}
