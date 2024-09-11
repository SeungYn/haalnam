'use client';
import { Button } from '@/components/common';
import MobileHeader from '@/components/common/header/MobileHeader';
import Hr from '@/components/common/Hr';
import SSRSuspense from '@/components/common/SSRSuspense';
import ProfileSkelton from '@/components/my/profile/ProfileSkelton';
import ProfileContainer from '@/container/my/ProfileContainer';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function MyPage() {
	const { data } = useSession();
	const router = useRouter();
	if (!data) return;

	const { user } = data;

	return (
		<div className="relative min-h-full overflow-x-hidden text-xl">
			<MobileHeader title={'마이페이지'} />
			<SSRSuspense fallback={<ProfileSkelton />}>
				<ProfileContainer id={user.id} />
			</SSRSuspense>
			<Hr className="my-2" />
			<Button
				className="mx-auto w-3/4 py-3 md:py-2 md:text-xl"
				accent
				onClick={() => {
					signOut({ callbackUrl: '/' });
				}}
			>
				로그아웃
			</Button>
		</div>
	);
}
