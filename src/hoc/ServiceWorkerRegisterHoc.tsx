'use client';

import { PropsWithChildren, useEffect } from 'react';

export default function ServiceWorkerRegisterHoc({
	children,
}: PropsWithChildren) {
	useEffect(() => {
		if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/serviceWorker.js')
				.then((registration) => {})
				.catch((error) => {});
		}
	}, []);

	return <>{children}</>;
}
