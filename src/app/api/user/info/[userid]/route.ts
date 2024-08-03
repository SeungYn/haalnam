import { auth } from '@/lib/auth';
import {
	checkUser,
	getUsedTodayTotalTimesByUserId,
	getUsedTotalTimes,
	getUserInfoById,
} from '@/service/server/userServerService';
import { User } from '@prisma/client';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params }: { params: { userid: string } }
) {
	const session = await auth();
	let user: User | null;
	try {
		user = await checkUser(params.userid, session);
	} catch {
		return NextResponse.json(
			{ message: '유저 정보가 올바르지 않습니다.' },
			{ status: 401 }
		);
	}

	const userProfile = await getUserInfoById(params.userid);
	const totalHours = await getUsedTotalTimes(params.userid);
	const todayHours = await getUsedTodayTotalTimesByUserId(params.userid);

	return NextResponse.json(
		{ ...userProfile, totalHours, todayHours },
		{ status: 200 }
	);
}
