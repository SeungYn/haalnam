'use client';

import { Button } from '@/components/common';
import { useRouter } from 'next/navigation';

export default function MyErrorPage({ error }: { error: Error }) {
	const router = useRouter();
	return (
		<div className="flex h-full flex-col items-center justify-center">
			<div></div>
			<p className="mb-8 text-4xl font-bold">{error.message}</p>
			<Button size={'medium'} onClick={() => router.back()}>
				뒤로가기
			</Button>
		</div>
	);
}
