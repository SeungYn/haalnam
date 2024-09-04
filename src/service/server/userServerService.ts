import {
	findTimesByUserId,
	findTodayTimesByUserId,
} from '@/repository/timeRepository';
import {
	findUserBynid,
	findUserListByNidWithCursor,
	findUserInfoById,
	findUsersCount,
	updateUserProfileById,
	USER_ELEMENTS_PER_PAGE,
	USER_PAGES_PER_BLOCK,
	findUserById,
} from '@/repository/userRepository';
import { Session } from 'next-auth';

export async function getUserList(
	cursor?: number,
	firstCurosr?: number,
	currentPage?: number,
	targetPage?: number,
	limit?: number
) {
	//console.log(cursor, currentPage, targetPage);
	const users = await findUserListByNidWithCursor(
		cursor,
		firstCurosr,
		currentPage,
		targetPage,
		limit
	);

	const totalElements = await findUsersCount();

	const totalPages = Math.ceil(totalElements / USER_ELEMENTS_PER_PAGE);
	let startPage = 1,
		lastPage =
			USER_PAGES_PER_BLOCK > totalPages ? totalPages : USER_PAGES_PER_BLOCK;

	if (currentPage && targetPage) {
		const block = Math.ceil(targetPage / USER_PAGES_PER_BLOCK) - 1;

		startPage = Number(block.toString() + '1');

		lastPage =
			startPage + USER_PAGES_PER_BLOCK - 1 > totalPages
				? totalPages
				: startPage + USER_PAGES_PER_BLOCK - 1;
	}
	const isNextBlock = lastPage < totalPages;
	const isPrevBlock = startPage !== 1;

	return {
		users,
		pageInfo: {
			startPage,
			lastPage,
			isNextBlock,
			isPrevBlock,
		},
	};
}

export async function getUserByNid(nid: number) {
	const user = await findUserBynid(nid);
	return user;
}
/**
 * 유저정보가 있는지 확인
 */
export async function checkUser(
	id: string | undefined,
	session: Session | null
) {
	if (!session) throw new Error('유저 정보가 없음');
	if (id === undefined) throw new Error('유저 정보가 없음');
	const user = await getUserById(id);
	if (user === null) throw new Error('유저 정보가 없음');

	return user;
}

export async function getUserById(id: string) {
	const user = await findUserById(id);
	return user;
}

export async function getUserInfoById(id: string) {
	return await findUserInfoById(id);
}

export async function postUserProfileById(
	params: Exclude<UserProfile, 'is_public'>
) {
	return await updateUserProfileById(params);
}
/**
 * 현재까지 사용한 총 시간
 * @param userId
 * @returns
 */
export async function getUsedTotalTimes(userId: string) {
	const times = await findTimesByUserId(userId);
	const length = times.length;

	let totalMs = 0;
	for (let i = 0; i < length; i++) {
		if (times[i].endTime === null) continue;
		const ms = times[i].endTime!.getTime() - times[i].startTime.getTime();
		totalMs += ms;
	}

	return (totalMs / (1000 * 60 * 60)).toFixed(1);
}

/**
 * 오늘 사용한 총 시간
 * @param userId
 * @returns
 */
export async function getUsedTodayTotalTimesByUserId(userId: string) {
	const times = await findTodayTimesByUserId(userId);
	const length = times.length;

	let totalMs = 0;
	for (let i = 0; i < length; i++) {
		if (times[i].endTime === null) continue;
		const ms = times[i].endTime!.getTime() - times[i].startTime.getTime();
		totalMs += ms;
	}

	return (totalMs / (1000 * 60 * 60)).toFixed(1);
}
