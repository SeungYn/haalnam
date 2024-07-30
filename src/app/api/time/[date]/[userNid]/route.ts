import { auth } from '@/lib/auth';
import client from '@/lib/db';
import { findUserBynid } from '@/repository/userRepository';
import { getFullDate } from '@/utils/date';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params: { date, userNid } }: { params: { date: any; userNid: number } }
) {
	const session = await auth();

	//console.log('postsession', session);
	if (!session)
		return new NextResponse('Authentication Error ee', { status: 401 });
	const user = await findUserBynid(+userNid);
	if (!user)
		return NextResponse.json(
			{ message: '해당 사용자가 존재하지 않습니다.' },
			{ status: 404 }
		);

	const [y, m, d] = date.split('/').map(Number);

	// UTC 기준 시간 설정
	const day = getFullDate(y, m, d);

	const tomorrow = getFullDate(y, m, d + 1);

	let times;
	try {
		times = await client.time.findMany({
			where: {
				time: {
					gte: day,
					lte: tomorrow,
				},
				userId: user.id,
			},
			orderBy: {
				time: 'asc',
			},
		});
	} catch (e) {
		console.error(e);
	}

	//console.log(times);

	return NextResponse.json(times, { status: 200 });
}
