import PagingButton from '@/components/common/PagingButton/PagingButton';
import {
	IoIosArrowBackIcon,
	IoIosArrowForwardIcon,
	IoSearchIcon,
} from '@/components/icons';
import UserList from '@/components/user/List/UserList';
import { getUserList } from '@/service/server/userServerService';

type Props = {
	searchParams: {
		page: number;
		cursor: number;
		prev: number;
		firstcursor: number;
	};
};

export default async function ListPage({ searchParams }: Props) {
	const { page, cursor, prev, firstcursor } = searchParams;
	//console.log(page, cursor, prev);
	const { users, pageInfo } = await getUserList(
		+cursor,
		+firstcursor,
		+prev,
		+page
	);

	if (users.length === 0) return;

	const firstCursor = users[0].nid;
	const nextCursor = users.at(-1)?.nid;
	const pageArr = Array.from(
		{
			length: pageInfo.lastPage - pageInfo.startPage + 1,
		},
		(_, i) => pageInfo.startPage + i
	);

	return (
		<section className="flex min-h-full flex-col py-4">
			<nav className="mb-16 mt-8">
				<div className="relative mx-auto w-[80%] max-w-5xl overflow-hidden rounded-full border border-h_gray">
					<input
						type="text"
						className="w-full bg-h_black px-4 py-2 text-xl text-white"
					/>
					<button className="absolute right-5 top-1/2 z-10 -translate-y-1/2">
						<IoSearchIcon size="medium" />
					</button>
				</div>
			</nav>
			<div className="grow">
				<UserList users={users} />
			</div>
			<div className="mt-12 flex justify-center gap-4">
				<PagingButton
					href={
						pageInfo.isPrevBlock
							? `/list?page=${pageInfo.startPage - 1}&cursor=${nextCursor}&prev=${page ? +page : '1'}&firstcursor=${firstCursor}`
							: ''
					}
				>
					<IoIosArrowBackIcon size="medium" />
				</PagingButton>

				{pageArr.map((v) => {
					if (v === 1 && !page)
						return (
							<PagingButton key={v} active>
								{v}
							</PagingButton>
						);
					if (v !== +page) {
						return (
							<PagingButton
								href={`/list?page=${v}&cursor=${nextCursor}&prev=${page ? page : '1'}&firstcursor=${firstCursor}`}
								key={v}
								active={v === +page}
							>
								{v}
							</PagingButton>
						);
					}
					return (
						<PagingButton key={v} active={v === +page}>
							{v}
						</PagingButton>
					);
				})}

				<PagingButton
					href={
						pageInfo.isNextBlock
							? `/list?page=${pageInfo.lastPage + 1}&cursor=${nextCursor}&prev=${page ? +page : '1'}&firstcursor=${firstCursor}`
							: ''
					}
				>
					<IoIosArrowForwardIcon size="medium" />
				</PagingButton>
			</div>
		</section>
	);
}

const list = [
	{
		id: 'clz6veu0000dhsel7ulopmr',
		name: '유승윤',
		createdAt: '2024-07-29T04:30:32.070Z',
		email: 'kwls0707@naver.com',
		emailVerified: null,
		nickname: '여유로운햇님이',
		image:
			'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640',
		timer_status: 'END',
	},
	{
		id: 'clz6hqveu0000dhsel7ulopmr',
		name: '유승윤',
		createdAt: '2024-07-29T04:30:32.070Z',
		email: 'kwls0707@naver.com',
		emailVerified: null,
		nickname: '여유로운햇님이',
		image: null,
		timer_status: 'END',
	},
	{
		id: 'clhqveu0000dhsel7ulopmr',
		name: '유승윤',
		createdAt: '2024-07-29T04:30:32.070Z',
		email: 'kwls0707@naver.com',
		emailVerified: null,
		nickname: '여유로fwefwefewf w fewfewf운햇님이',
		image:
			'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640',
		timer_status: 'END',
	},
	{
		id: 'clhqveu0000dㄹhsel7ulopmr',
		name: '유승윤',
		createdAt: '2024-07-29T04:30:32.070Z',
		email: 'kwls0707@naver.com',
		emailVerified: null,
		nickname: '여유로fwefwefewf w fewfewf운햇님이',
		image:
			'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640',
		timer_status: 'START',
	},
];
