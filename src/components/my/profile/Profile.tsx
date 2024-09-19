import { Button } from '@/components/common';
import { IoLogoInstagramIcon } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import ProfileIntroduce from './ProfileIntroduce';
import { interFont } from '@/fonts';

type Props = UserInfo & {
	onProfileModify: () => void;
};

export default function Profile({
	id,
	image,
	instagram,
	introduce,
	nickname,
	todayHours,
	totalHours,
	onProfileModify,
}: Props) {
	return (
		<section className="pt-8">
			<div className="mb-6 flex gap-4">
				<div className="relative h-[68px] w-[68px] overflow-hidden rounded-full md:h-[120px] md:w-[120px]">
					<Image
						fill
						sizes="160px"
						src={image || '/assets/user/userimage.jpeg'}
						alt="프로필 이미지"
					/>
				</div>
				<div className={`flex flex-col justify-center gap-4`}>
					<p className="text-4xl">{nickname}</p>
					<ul className={`flex gap-8 text-xl`}>
						<li className="flex items-center">
							총{' '}
							<span className={`text-2xl text-accent ${interFont.className}`}>
								{totalHours}
							</span>
							시간 사용
						</li>
						<li className="flex items-center">
							오늘{' '}
							<span className={`text-2xl text-accent ${interFont.className}`}>
								{todayHours}
							</span>
							시간 사용
						</li>
					</ul>
				</div>
			</div>
			<div className="mb-8 flex flex-col gap-2">
				<ProfileIntroduce introduce={introduce} />
				{instagram === '' && (
					<p className="text-base">인스타그램을 등록해봐요!</p>
				)}
				{instagram !== '' && (
					<div className="flex items-center gap-2">
						<IoLogoInstagramIcon />
						<Link
							href={`https://www.instagram.com/${instagram}`}
							className="text-base text-blue-400"
							target="_blank"
						>{`www.instagram.com/${instagram}`}</Link>
					</div>
				)}
			</div>

			<Button
				className="mx-auto w-3/4 py-3 md:py-2 md:text-xl"
				onClick={() => {
					onProfileModify();
				}}
			>
				프로필 편집
			</Button>
		</section>
	);
}
