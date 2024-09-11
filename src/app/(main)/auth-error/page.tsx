'use client';

import { revalidatePathAction } from '@/service/server-action';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function AuthErrorPage() {
	useEffect(() => {
		revalidatePathAction();
		signOut({ callbackUrl: '/' });
	}, []);
	// eslint-disable-next-line
	return null;
}
