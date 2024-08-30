import dbClient from '@/lib/db';
import { getNowYYYY_MM_DD } from '@/utils/date';

export async function findTimesByUserId(userId: string) {
	const times = dbClient.time.findMany({
		where: {
			userId,
		},
		orderBy: { startTime: 'asc' },
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
			startTime: {
				gte: today,
				lte: tomorrow,
			},
			userId,
		},
		orderBy: {
			startTime: 'asc',
		},
	});

	return times;
}

export async function updateTimeByUserId({
	startTime,
	subject,
	userId,
	endTime,
	timeId,
}: {
	startTime: Date;
	endTime: Date;
	userId: string;
	timeId: number;
	subject: string;
}) {
	const res = await dbClient.time.update({
		where: {
			id: timeId,
			userId,
		},
		data: {
			startTime,
			endTime,
			subject,
		},
	});

	return res;
}
