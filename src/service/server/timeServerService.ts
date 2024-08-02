import client from '@/lib/db';

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
