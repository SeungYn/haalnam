import { auth } from '@/lib/auth';
import {
	getUsedTodayTotalTimesByUserId,
	getUsedTotalTimes,
	getUserInfoById,
} from '@/service/server/userServerService';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params }: { params: { userid: string } }
) {
	const session = await auth();
	if (!session)
		return new NextResponse('Authentication Error ee', { status: 401 });

	const userProfile = await getUserInfoById(params.userid);
	const totalHours = await getUsedTotalTimes(params.userid);
	const todayHours = await getUsedTodayTotalTimesByUserId(params.userid);

	return NextResponse.json(
		{ ...userProfile, totalHours, todayHours },
		{ status: 200 }
	);
}
