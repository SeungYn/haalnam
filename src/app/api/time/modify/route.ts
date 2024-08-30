import { checkUser } from '@/service/server/userServerService';
import { ExceptionRes, handleError } from '@/utils/exception';
import { NextRequest, NextResponse } from 'next/server';
import * as timeService from '@/service/server/timeServerService';
import { PatchTimeRequest, PostAddTimerRequest } from '@/service/types/time';
import { auth } from '@/lib/auth';
import { User } from '@prisma/client';
import { makeUTCStringDate } from '@/utils/date';
import client from '@/lib/db';

/**
 * 타이머 수정 api
 * @param request
 * @returns
 */
export async function PATCH(request: NextRequest) {
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

	const { id: userId } = user!;
	let reqData: PatchTimeRequest;

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	try {
		const res = await timeService.updateTime({ ...reqData, userId });
		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}

/**
 * 타이머 추가 api
 * @param request
 * @returns
 */
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
		await client.time.create({
			data: {
				subject,
				status: 'END',
				startTime: startDate,
				endTime: endDate,
				userId: user.id,
			},
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
