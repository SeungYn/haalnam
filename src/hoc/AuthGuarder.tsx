'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

export default function AuthGuarder({ children }: PropsWithChildren) {
	const { data } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!data) {
			alert('로그인이 필요합니다!');
			return router.push('/');
		}
	}, []);

	return <>{children}</>;
}
