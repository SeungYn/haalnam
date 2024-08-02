'use client';

import { Button } from '@/components/common';
import { TbFaceIdErrorIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';

export default function error({ error }: { error: Error }) {
	const router = useRouter();
	return (
		<div className="flex h-full flex-col items-center justify-center">
			<div>
				<TbFaceIdErrorIcon size="large" style={{ fontSize: '20rem' }} />
			</div>
			<p className="mb-8 text-4xl font-bold">{error.message}</p>
			<Button size={'medium'} onClick={() => router.back()}>
				뒤로가기
			</Button>
		</div>
	);
}
