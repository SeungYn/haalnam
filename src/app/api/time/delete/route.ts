import { auth } from '@/lib/auth';
import client from '@/lib/db';
import * as timeService from '@/service/server/timeServerService';
import { checkUser } from '@/service/server/userServerService';
import { DeleteTimerRequest } from '@/service/types/time';
import { ExceptionRes } from '@/utils/exception';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const session = await auth();

	let user: User;
	try {
		user = await checkUser(session?.user?.id, session);
	} catch {
		return NextResponse.json(
			new ExceptionRes('유저 정보가 올바르지 않습니다.'),
			{ status: 401 }
		);
	}
	const { id } = user;

	let reqData: DeleteTimerRequest;

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	try {
		await timeService.deleteTimes(reqData, id);
	} catch (e) {
		return NextResponse.json(
			new ExceptionRes('오류가 발생했습니다. 다시 시도해주세요'),
			{ status: 500 }
		);
	}

	return new NextResponse(null, { status: 204 });
}
