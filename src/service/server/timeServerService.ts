import client from '@/lib/db';
import {
	DeleteTimerRequest,
	StartTimerRequest,
	StopTimerRequest,
} from '../types/time';
import { Status, Time, User } from '@prisma/client';
import { getNowDate } from '@/utils/date';
import { CustomException, ExceptionRes } from '@/utils/exception';

/**
 * 진행중인 가장 최근 타이머 가져오는 함수
 * @param userId
 * @returns
 */
export async function getLatestTime(userId: string) {
	const time = await client.time.findFirst({
		where: {
			userId,
			status: 'START',
		},
		orderBy: {
			startTime: 'desc',
		},
	});

	return time;
}

export async function deleteTimes(reqData: DeleteTimerRequest, userId: string) {
	try {
		const res = await client.$transaction(async () => {
			const time = await client.time.findFirstOrThrow({
				where: {
					id: reqData.timeId,
					userId,
				},
			});

			await client.time.delete({
				where: {
					id: time.id,
				},
			});
		});
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function startTimer({
	status,
	subject,
	id: userId,
	timer_status,
}: StartTimerRequest & Pick<User, 'id' | 'timer_status'>) {
	let next_timer_status: Status = timer_status === 'START' ? 'END' : 'START';
	// 타이머 시작 요청을 받았을 때 현재 서버상 타이머가 진행중인 경우
	if (status === 'START' && timer_status === 'START') {
		let res;
		try {
			res = await client.$transaction(async () => {
				const startTime = getNowDate();
				let now = getNowDate();
				// 최근 타이머
				const recentTime = await getLatestTime(userId);
				// 자정
				const midNight = new Date(
					`${recentTime!.startTime.toISOString().split('T')[0]}T23:59:59Z`
				);
				// 타이머 종료시간 설정

				// 만약 자정을 넘길경우 23:59:59 시간으로 처리
				if (recentTime && now.getTime() > midNight.getTime()) {
					now = midNight;
				}

				// 기존 타이머 종료
				await client.time.update({
					data: {
						endTime: now,
					},
					where: {
						userId,
						id: recentTime!.id,
					},
				});
				next_timer_status = 'START';

				const post = await client.time.create({
					data: {
						userId,
						status: next_timer_status,
						subject: subject,
						startTime,
					},
				});
				await client.user.update({
					where: { id: userId },
					data: {
						timer_status: next_timer_status,
					},
				});

				return post;
			});

			return res;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	// 타이머 종료 요청을 받았을 때 현재 서버 상태가 종료인 경우
	else if (status === 'END' && timer_status === 'END') {
		throw new CustomException('현재 진행 중인 타이머가 없습니다.');
	}
	let res;
	// 에외가 아닌경우
	try {
		res = await client.$transaction(async () => {
			let startTime = getNowDate();

			const post = await client.time.create({
				data: {
					userId,
					status: next_timer_status,
					subject: subject,
					startTime,
				},
			});
			await client.user.update({
				where: { id: userId },
				data: {
					timer_status: next_timer_status,
				},
			});

			return post;
		});

		return res;
	} catch (error) {
		console.error(error);

		throw new CustomException('에러가 발생했습니다. 다시 시도해주세요');
	}
}

export async function stopTimer({
	status,
	id: userId,
	timer_status,
	timeId,
}: StopTimerRequest & Pick<User, 'id' | 'timer_status'>) {
	// 타이머 종료 요청을 받았을 때 현재 서버 상태가 종료인 경우
	if (status === 'END' && timer_status === 'END') {
		throw new CustomException('현재 진행 중인 타이머가 없습니다.');
	}

	let res;
	// 에외가 아닌경우
	try {
		res = await client.$transaction(async () => {
			let now = getNowDate();
			// 최근 타이머
			const recentTime = await client.time.findFirstOrThrow({
				where: {
					id: timeId,
					userId,
				},
			});
			// 자정
			const midNight = new Date(
				`${recentTime!.startTime.toISOString().split('T')[0]}T23:59:59Z`
			);

			// 만약 자정을 넘길경우 23:59:59 시간으로 처리
			if (recentTime && now.getTime() > midNight.getTime()) {
				now = midNight;
			}

			const post = await client.time.update({
				data: {
					endTime: now,
					status: 'END',
				},
				where: {
					id: recentTime.id,
					userId,
				},
			});
			await client.user.update({
				where: { id: userId },
				data: {
					timer_status: 'END',
				},
			});

			return post;
		});

		return res;
	} catch (error) {
		console.error(error);

		throw new CustomException('에러가 발생했습니다. 다시 시도해주세요');
	}
}
