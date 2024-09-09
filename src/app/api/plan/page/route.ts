import { NextRequest, NextResponse } from 'next/server';
import * as planServerService from '@/service/server/planServerService';
import * as userServerService from '@/service/server/userServerService';
import { ExceptionRes, handleError } from '@/utils/exception';
import { checkUser } from '@/service/server/userServerService';
import { auth } from '@/lib/auth';
import { User } from '@prisma/client';
import { PlanDTO, PostPlanPageRequest } from '@/service/types/plan';

export async function GET(request: NextRequest) {
	const session = await auth();

	//console.log('postsession', { session });
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
		const res = await planServerService.getPlanPagesByUserId(id);
		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}

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
	let reqData: PostPlanPageRequest;

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	const { name } = reqData;

	try {
		const res = await planServerService.createPlanPage(id, name);
		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}

// defaultPlanPage 바꾸는 api
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

	const { id } = user!;
	let reqData: PlanDTO.PatchDefaultPlanPageReq;

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	const { planPageId } = reqData;

	try {
		const res = await userServerService.updateUserDefaultPlanPage(
			id,
			planPageId
		);
		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}
