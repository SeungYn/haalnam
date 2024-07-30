import {
	findUserListByNidWithCursor,
	findUsersCount,
	USER_ELEMENTS_PER_PAGE,
	USER_PAGES_PER_BLOCK,
} from '@/repository/userRepository';

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
