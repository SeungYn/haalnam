import { auth } from '@/lib/auth';
import { checkUser } from '@/service/server/userServerService';

import { NextRequest, NextResponse } from 'next/server';
import * as planServerService from '@/service/server/planServerService';
import { User } from '@prisma/client';
import { handleError } from '@/utils/exception';

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
