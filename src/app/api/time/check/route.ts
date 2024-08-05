import { auth } from '@/lib/auth';
import client from '@/lib/db';
import { getLatestTime } from '@/service/server/timeServerService';
import { checkUser } from '@/service/server/userServerService';
import { getNowDate } from '@/utils/date';
import { ExceptionRes } from '@/utils/exception';
import { User } from '@prisma/client';
import { NextResponse } from 'next/server';

/**
 * 현재 타이머가 진행중이면 종료하는 api
 */
export async function POST() {
	const session = await auth();

	let user: User;
	try {
		user = await checkUser(session?.user?.id, session);
	} catch {
		return NextResponse.json(
			new ExceptionRes('유저 정보가 올바르지 않습니다.'),
			{ status: 401 }
		);
	}

	const { id, timer_status } = user;

	if (timer_status === 'END') return new NextResponse(null, { status: 200 });

	try {
		const res = await client.$transaction(async () => {
			let date = getNowDate();

			const recentTime = await getLatestTime(id);
			const now = getNowDate();

			// 만약 자정을 넘길경우 23:59:59 시간으로 처리
			if (recentTime && recentTime?.time.getDate() < now.getDate()) {
				date = new Date(
					`${recentTime.time.toISOString().split('T')[0]}T23:59:59Z`
				);
			}

			const post = await client.time.create({
				data: {
					userId: id,
					status: 'END',
					subject: recentTime!.subject,
					time: date,
				},
			});
			await client.user.update({
				where: { id },
				data: {
					timer_status: 'END',
				},
			});

			return post;
		});

		return NextResponse.json(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			new ExceptionRes('에러가 발생했습니다. 다시 시도해주세요'),
			{ status: 500 }
		);
	}
}
