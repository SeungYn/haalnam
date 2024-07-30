import { LuDotIcon } from '@/components/icons';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

type UserListProps = {
	users: User[];
};

export default function UserList({ users }: UserListProps) {
	return (
		<div className="flex flex-wrap gap-[1%]">
			{users.map((i) => (
				<UserListItem key={i.id} user={i} />
			))}
		</div>
	);
}

type UserListItemProps = {
	user: User;
};

export function UserListItem({ user }: UserListItemProps) {
	const { nickname, image, id, timer_status } = user;

	return (
		<Link
			href={`/time/user/${id}`}
			className="grow-0 basis-[49%] pb-8 leading-4 md:basis-[24%]"
			role="button"
		>
			<div className="flex min-h-[8rem] items-center justify-center rounded-xl border border-h_gray px-2 text-center hover:bg-h_gray_semi_light">
				<h3 className="break-words text-2xl leading-6">{`${nickname}의 하루`}</h3>
			</div>
			<div className="flex grow-0 justify-between py-2">
				<div className="flex items-center gap-2">
					<div className="relative h-[24px] w-[24px] overflow-hidden rounded-full md:h-[32px] md:w-[32px]">
						<Image
							fill
							src={image ? image : '/assets/user/userimage.jpeg'}
							alt="유저 프로필 이미지"
						/>
					</div>
					<p className="max-w-[150px] truncate md:max-w-[200px]">{nickname}</p>
				</div>
				{timer_status === 'START' && (
					<span className="flex shrink-0 items-center">
						<LuDotIcon size="small" color="rgb(134 239 172 )" />
						<p className="text-green-300">진행중</p>
					</span>
				)}
			</div>
		</Link>
	);
}
