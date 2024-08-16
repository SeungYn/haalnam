import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/db';
import { getNowYYYY_MM_DD } from '@/utils/date';
import { User } from '@prisma/client';
import { auth } from '@/lib/auth';
import { checkUser } from '@/service/server/userServerService';
import { CustomException, ExceptionRes } from '@/utils/exception';
import { StartTimerRequest, StopTimerRequest } from '@/service/types/time';
import * as timeService from '@/service/server/timeServerService';

// timer start api
export async function POST(request: NextRequest) {
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

	let reqData: StartTimerRequest;

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	try {
		const res = await timeService.startTimer({
			status: reqData.status,
			subject: reqData.subject,
			id,
			timer_status,
		});
	} catch (e) {
		if (e instanceof CustomException) {
			return NextResponse.json(new ExceptionRes(e.message), { status: 500 });
		}

		return NextResponse.json(
			new ExceptionRes('오류가 발생했습니다. 다시 시도해주세요'),
			{ status: 500 }
		);
	}

	return new NextResponse(null, { status: 204 });
}

// timer stop api
export async function FETCH(request: NextRequest) {
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
	const { id: userId, timer_status } = user;

	let reqData: StopTimerRequest;

	try {
		reqData = await request.json();
	} catch (e) {
		return NextResponse.json(new ExceptionRes('유효하지 않은 값입니다.'), {
			status: 400,
		});
	}

	try {
		const res = await timeService.stopTimer({
			status: reqData.status,
			id: userId,
			timeId: reqData.timeId,
			timer_status,
		});
	} catch (e) {
		if (e instanceof CustomException) {
			return NextResponse.json(new ExceptionRes(e.message), { status: 500 });
		}

		return NextResponse.json(
			new ExceptionRes('오류가 발생했습니다. 다시 시도해주세요'),
			{ status: 500 }
		);
	}

	return new NextResponse(null, { status: 204 });
}

export async function GET(request: NextRequest) {
	const session = await auth();
	//console.log('postsession', session);
	if (!session)
		return new NextResponse('Authentication Error ee', { status: 401 });
	const { id } = session.user;

	// UTC 기준 시간 설정
	const today = getNowYYYY_MM_DD();

	const tomorrow = new Date(
		getNowYYYY_MM_DD().setDate(getNowYYYY_MM_DD().getDate() + 1)
	);

	//console.log(new Date(), today, tomorrow, id);
	let times;
	try {
		times = await client.time.findMany({
			where: {
				startTime: {
					gte: today,
					lte: tomorrow,
				},
				userId: id,
			},
			orderBy: {
				startTime: 'asc',
			},
		});
	} catch (e) {
		console.error(e);
	}

	return NextResponse.json(times, { status: 200 });
}

// time schema 변경 전 start, stop api
// export async function POST(request: NextRequest) {
// 	const session = await auth();

// 	let user: User;
// 	try {
// 		user = await checkUser(session?.user?.id, session);
// 	} catch {
// 		return NextResponse.json(
// 			new ExceptionRes('유저 정보가 올바르지 않습니다.'),
// 			{ status: 401 }
// 		);
// 	}
// 	const { id, timer_status } = user;
// 	let next_timer_status: Status = timer_status === 'START' ? 'END' : 'START';

// 	const formData = await request.formData();
// 	const subject = formData.get('subject') as string;
// 	const status = formData.get('status') as Status;
// 	const time = formData.get('time');

// 	// 타이머 시작 요청을 받았을 때 현재 서버상 타이머가 진행중인 경우
// 	if (status === 'START' && timer_status === 'START') {
// 		try {
// 			const res = await client.$transaction(async () => {
// 				let date = getNowDate();

// 				// 타이머 종료시간 설정
// 				if (next_timer_status === 'END') {
// 					const recentTime = await getLatestTime(id);
// 					const now = getNowDate();

// 					// 만약 자정을 넘길경우 23:59:59 시간으로 처리
// 					if (recentTime && recentTime?.time.getDate() < now.getDate()) {
// 						date = new Date(
// 							`${recentTime.time.toISOString().split('T')[0]}T23:59:59Z`
// 						);
// 					}
// 				}
// 				// 기존 타이머 종료
// 				await client.time.create({
// 					data: {
// 						userId: id,
// 						status: 'END',
// 						subject: subject,
// 						time: date,
// 					},
// 				});
// 				next_timer_status = 'START';

// 				const post = await client.time.create({
// 					data: {
// 						userId: id,
// 						status: next_timer_status,
// 						subject: subject,
// 						time: date,
// 					},
// 				});
// 				await client.user.update({
// 					where: { id },
// 					data: {
// 						timer_status: next_timer_status,
// 					},
// 				});

// 				return post;
// 			});

// 			return NextResponse.json({ ...res, time }, { status: 200 });
// 		} catch (error) {
// 			console.error(error);
// 			return NextResponse.json(
// 				new ExceptionRes(
// 					'에러가 발생했습니다. 다시 시도해주세요',
// 					ExceptionCode.TimeContinue
// 				),
// 				{ status: 500 }
// 			);
// 		}
// 	}
// 	// 타이머 종료 요청을 받았을 때 현재 서버 상태가 종료인 경우
// 	else if (status === 'END' && timer_status === 'END') {
// 		return NextResponse.json(
// 			new ExceptionRes('현재 진행 중인 타이머가 없습니다.'),
// 			{ status: 400 }
// 		);
// 	}

// 	// 에외가 아닌경우
// 	try {
// 		const res = await client.$transaction(async () => {
// 			let date = getNowDate();

// 			// 타이머 종료시간 설정
// 			if (next_timer_status === 'END') {
// 				const recentTime = await getLatestTime(id);
// 				const now = getNowDate();

// 				// 만약 자정을 넘길경우 23:59:59 시간으로 처리
// 				if (recentTime && recentTime?.time.getDate() < now.getDate()) {
// 					date = new Date(
// 						`${recentTime.time.toISOString().split('T')[0]}T23:59:59Z`
// 					);
// 				}
// 			}

// 			const post = await client.time.create({
// 				data: {
// 					userId: id,
// 					status: next_timer_status,
// 					subject: subject,
// 					time: date,
// 				},
// 			});
// 			await client.user.update({
// 				where: { id },
// 				data: {
// 					timer_status: next_timer_status,
// 				},
// 			});

// 			return post;
// 		});

// 		return NextResponse.json({ ...res, time }, { status: 200 });
// 	} catch (error) {
// 		console.error(error);
// 		return NextResponse.json(
// 			new ExceptionRes(
// 				'에러가 발생했습니다. 다시 시도해주세요',
// 				ExceptionCode.TimeContinue
// 			),
// 			{ status: 500 }
// 		);
// 	}

// 	// 클라에서 보낸 time은 그대로 보내야됨 UTC + 9 이기 때문
// 	// console.log('res', res);
// }
