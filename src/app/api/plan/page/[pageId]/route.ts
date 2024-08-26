import { auth } from '@/lib/auth';
import { checkUser } from '@/service/server/userServerService';
import { NextRequest, NextResponse } from 'next/server';
import * as planServerService from '@/service/server/planServerService';
import { User } from '@prisma/client';
import { ExceptionRes, handleError } from '@/utils/exception';
import { PatchPlanPageRequest } from '@/service/types/plan';

export async function GET(
	request: NextRequest,
	{ params: { pageId } }: { params: { pageId: number } }
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
		const res = await planServerService.getPlanPageById(pageId, id);
		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}

export async function PATCH(
	request: NextRequest,
	{ params: { pageId } }: { params: { pageId: number } }
) {
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
	let reqData: PatchPlanPageRequest;

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	const { name } = reqData;

	try {
		const res = await planServerService.updatePlanPage(pageId, name, userId);
		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params: { pageId } }: { params: { pageId: number } }
) {
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

	try {
		const res = await planServerService.deletePlanPage(pageId, userId);
		return NextResponse.json(res, { status: 200 });
	} catch (e) {
		return handleError(e);
	}
}

/**
 * 페이지 가져오기 시간 계획 포함
 * 페이지 제목 수정
 * 페이지 삭제
 * 페이지 만들기
 */
