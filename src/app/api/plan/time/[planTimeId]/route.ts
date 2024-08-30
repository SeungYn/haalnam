import { auth } from '@/lib/auth';
import { checkUser } from '@/service/server/userServerService';

import { NextRequest, NextResponse } from 'next/server';
import * as planServerService from '@/service/server/planServerService';
import { User } from '@prisma/client';
import { ExceptionRes, handleError } from '@/utils/exception';
import { PatchPlanRequest } from '@/service/types/plan';

/**
 * 계획 삭제 API
 * @param request
 * @param param1
 * @returns
 */
export async function DELETE(
	request: NextRequest,
	{ params: { planTimeId } }: { params: { planTimeId: number } }
) {
	const session = await auth();
	//console.log('postsession', session);
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

	try {
		const res = await planServerService.deletePlan(planTimeId, id);
		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}

/**
 * 계획 수정 API
 * @param request
 * @param param1
 * @returns
 */
export async function PATCH(
	request: NextRequest,
	{ params: { planTimeId } }: { params: { planTimeId: number } }
) {
	const session = await auth();
	//console.log('postsession', session);
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

	let reqData: PatchPlanRequest;

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	try {
		const res = await planServerService.updatePlan({ ...reqData, userId: id });
		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}
