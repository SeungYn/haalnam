'use client';

import { PropsWithChildren, useEffect } from 'react';

export default function HeightAdjustHOC({ children }: PropsWithChildren) {
	useEffect(() => {
		console.log(navigator.userAgent);
		if (isMobile()) {
			document.body.style.height = window.innerHeight + 'px';
		}
	}, []);
	return <>{children}</>;
}

function isMobile() {
	return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
}
