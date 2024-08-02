import { auth } from '@/lib/auth';
import client from '@/lib/db';
import { getFullDate, getNowYYYY_MM_DD } from '@/utils/date';
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params: { date } }: { params: { date: any } }
) {
	const session = await auth();
	
	//console.log('postsession', session);
	if (!session)
		return new NextResponse('Authentication Error ee', { status: 401 });
	const { id } = session.user;

	const [y, m, d] = date.split('/').map(Number);

	// UTC 기준 시간 설정
	const day = getFullDate(y, m, d);

	const tomorrow = getFullDate(y, m, d + 1);
	// console.log(y, m, d);
	// console.log(day, tomorrow);
	//console.log( day, tomorrow, id);
	let times;
	try {
		times = await client.time.findMany({
			where: {
				time: {
					gte: day,
					lte: tomorrow,
				},
				userId: id,
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
