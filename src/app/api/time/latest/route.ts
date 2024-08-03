import { auth } from '@/lib/auth';
import client from '@/lib/db';
import { getLatestTime } from '@/service/server/timeServerService';
import { checkUser } from '@/service/server/userServerService';

import { getNowDate, getNowYYYY_MM_DD } from '@/utils/date';
import { NextResponse } from 'next/server';

export async function GET() {
	const session = await auth();
	//console.log('postsession', session);
	try {
		const user = await checkUser(session?.user?.id, session);
	} catch {
		return NextResponse.json(
			{ message: '유저 정보가 올바르지 않습니다.' },
			{ status: 401 }
		);
	}
	const { id } = session!.user;

	let time = await getLatestTime(id);

	return NextResponse.json(time, { status: 200 });
}
