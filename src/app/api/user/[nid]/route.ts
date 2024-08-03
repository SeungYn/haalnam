import { auth } from '@/lib/auth';
import { findUserBynid } from '@/repository/userRepository';
import { checkUser } from '@/service/server/userServerService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params: { nid } }: { params: { nid: number } }
) {
	const session = await auth();

	try {
		const user = await checkUser(session?.user?.id, session);
	} catch {
		return NextResponse.json(
			{ message: '유저 정보가 올바르지 않습니다.' },
			{ status: 401 }
		);
	}

	const user = await findUserBynid(nid);

	return NextResponse.json(user, { status: 200 });
}
