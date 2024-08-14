'use client';

import { useEffect, useRef } from 'react';

export default function PopupStandard() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const main = document.querySelector('main')!;
		//console.log(main.getBoundingClientRect());

		let timeoutId: NodeJS.Timeout | undefined;
		const resizeCB = () => {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				const { left } = main.getBoundingClientRect();
				const mainClientWidth = main.clientWidth;
				if (ref.current) {
					ref.current.style.left = `${left}px`;
					ref.current.style.width = `${mainClientWidth}px`;
				}
			}, 10);
		};
		resizeCB();
		window.addEventListener('resize', resizeCB);

		return () => {
			window.removeEventListener('resize', resizeCB);
		};
	}, []);
	return (
		<div ref={ref} className="fixed z-[999]" style={{ top: '0px' }}>
			<div id="time-portal" className="mx-auth max-w-screen-xl"></div>
		</div>
	);
}
