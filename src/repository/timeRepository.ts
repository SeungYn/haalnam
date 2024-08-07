import dbClient from '@/lib/db';
import { getNowYYYY_MM_DD } from '@/utils/date';
import { Time } from '@prisma/client';

export async function findTimesByUserId(userId: string) {
	const times = dbClient.time.findMany({
		where: {
			userId,
		},
		orderBy: { time: 'asc' },
	});

	return times;
}

export async function findTodayTimesByUserId(userId: string) {
	const today = getNowYYYY_MM_DD();

	const tomorrow = new Date(
		getNowYYYY_MM_DD().setDate(getNowYYYY_MM_DD().getDate() + 1)
	);

	//console.log(new Date(), today, tomorrow, id);
	let times = await dbClient.time.findMany({
		where: {
			time: {
				gte: today,
				lte: tomorrow,
			},
			userId,
		},
		orderBy: {
			time: 'asc',
		},
	});

	return times;
}
