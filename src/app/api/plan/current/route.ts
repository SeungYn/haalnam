import { checkUser } from '@/service/server/userServerService';
import { handleError } from '@/utils/exception';
import { User } from '@prisma/client';
import * as planServerService from '@/service/server/planServerService';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

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
