import client from '@/lib/db';
import { DeleteTimerRequest } from '../types/time';

export async function getLatestTime(id: string) {
	const time = await client.time.findFirst({
		where: {
			userId: id,
		},
		orderBy: {
			time: 'desc',
		},
	});

	return time;
}

export async function deleteTimes(reqData: DeleteTimerRequest, userId: string) {
	try {
		const res = await client.$transaction(async () => {
			if (!reqData.end) {
				const startTime = await client.time.findFirstOrThrow({
					where: {
						id: reqData.start,
						userId,
					},
				});

				await client.time.delete({
					where: {
						id: startTime.id,
					},
				});
			} else {
				const res = await client.time.findMany({
					where: {
						id: { in: [reqData.start, reqData.end] },
						userId,
					},
				});

				if (res.length < 2) throw new Error('입력값이 잘 못됨');

				await client.time.deleteMany({
					where: {
						id: { in: [res[0].id, res[1].id] },
					},
				});
			}
		});
	} catch (e) {
		console.error(e);
		throw e;
	}
}
