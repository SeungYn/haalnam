import { auth } from '@/lib/auth';
import { checkUser } from '@/service/server/userServerService';
import { PostPlanRequest } from '@/service/types/plan';
import { ExceptionRes, handleError } from '@/utils/exception';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import * as planServerService from '@/service/server/planServerService';
import { makeUTCStringDate } from '@/utils/date';

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

	const { id } = user!;
	let reqData: PostPlanRequest;

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	const { startTime, subject, planPageId, endTime } = reqData;

	try {
		const res = await planServerService.createPlan({
			startTime,
			subject,
			planPageId,
			endTime,
			userId: id,
		});
		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}
