'use client';

import { useEffect, useRef } from 'react';

/**
 * 팝업 기준이 되는 컴포넌트 모바일에서는 스크롤 때문에 기존
 * 컴포넌트에 팝업을 위치시키면 스크롤시 레이아웃이 이상해져서 추가시킴
 * @returns
 */
export default function PopupStandard() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const main = document.querySelector('main')!;

		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const { inlineSize } = entry.borderBoxSize[0];
				const { left } = entry.target.getBoundingClientRect();

				if (ref.current) {
					ref.current.style.left = `${left}px`;
					ref.current.style.width = `${inlineSize}px`;
				}
			}
		});
		resizeObserver.observe(main);

		return () => {
			resizeObserver.unobserve(main);
		};
	}, []);
	return (
		<div ref={ref} className="fixed z-[999999]" style={{ top: '0px' }}>
			<div id="time-portal" className="relative mx-auto max-w-screen-xl"></div>
		</div>
	);
}
