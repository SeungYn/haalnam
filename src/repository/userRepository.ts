import dbClient from '@/lib/db';
import { User } from '@prisma/client';

// 페이지당 보여줄 아이템 개수
export const USER_ELEMENTS_PER_PAGE = 40;
// 한 블럭당 보여줄 페이지 개수
export const USER_PAGES_PER_BLOCK = 10;

export async function findUserListByNidWithCursor(
	cursor?: number,
	firstCurosr?: number,
	currentPage?: number,
	targetPage?: number,
	limit: number = USER_ELEMENTS_PER_PAGE
) {
	let users: User[] = [];

	if (currentPage && targetPage) {
		const direction = currentPage < targetPage ? true : false;
		const start = currentPage < targetPage ? currentPage : targetPage;
		const last = currentPage < targetPage ? targetPage : currentPage;
		const take = currentPage > targetPage ? -limit : limit;
		let nextCursor = currentPage < targetPage ? cursor : firstCurosr;

		for (let i = start; i < last; i++) {
			users = await dbClient.user.findMany({
				take: take,
				skip: 1,
				...(cursor && { cursor: { nid: nextCursor } }),
				orderBy: { nid: 'asc' },
			});

			if (direction) {
				nextCursor = users.at(-1)?.nid;
			} else nextCursor = users[0].nid;
		}
	} else {
		users = await dbClient.user.findMany({
			take: limit,
			orderBy: { nid: 'asc' },
		});
	}

	return users;
}

export async function findUserBynid(nid: number) {
	const user = dbClient.user.findFirst({
		where: {
			nid,
		},
	});

	return user;
}

export async function findUsersCount() {
	return await dbClient.user.count();
}
