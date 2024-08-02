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
				where: {
					is_public: true,
				},
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
			where: { is_public: true },
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

export async function findUserById(id: string) {
	const user = dbClient.user.findFirst({
		where: {
			id,
		},
	});

	return user;
}

export async function findUsersCount() {
	return await dbClient.user.count({
		where: {
			is_public: true,
		},
	});
}

export async function findUserInfoById(id: string) {
	const profile = await dbClient.user.findFirst({
		where: {
			id: id,
		},
		select: {
			nickname: true,
			instagram: true,
			introduce: true,
			image: true,
			is_public: true,
		},
	});

	return profile;
}

/**
 * 유저 정보 수정
 * @param param0
 * @returns
 */
export async function updateUserProfileById({
	id,
	image,
	instagram,
	introduce,
	nickname,
}: UserInfo) {
	const filteredParams: { [key: string]: any } = {
		id: id,
		instagram: instagram,
		introduce: introduce,
		nickname: nickname,
	};

	if (image !== '' && image !== null) {
		filteredParams.image = image;
	}

	const profile = await dbClient.user.update({
		where: {
			id: id,
		},
		data: filteredParams,
	});

	return profile;
}
