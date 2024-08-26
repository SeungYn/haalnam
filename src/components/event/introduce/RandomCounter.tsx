'use client';

import { useEffect, useState } from 'react';

type Props = {
	targetNumber: number;
	delay: number;
};

export default function RandomCounter({ targetNumber, delay }: Props) {
	const [number, setNumber] = useState(0);
	useEffect(() => {
		const startTime = performance.now();

		let prevTime = startTime;

		const cb = (currentTime: number) => {
			const n = Math.floor(Math.random() * 10);
			const diffStart = currentTime - startTime;
			const diffPrev = currentTime - prevTime;
			if (diffStart < 3000) {
				setNumber(n);
				prevTime = currentTime;
				requestAnimationFrame(cb);
				return;
			} else if (diffStart >= 3000 && diffStart < 4000) {
				if (diffPrev > 100) {
					prevTime = currentTime;
					setNumber(n);
					requestAnimationFrame(cb);
				} else {
					requestAnimationFrame(cb);
				}
			} else if (diffStart >= 4000 && diffStart < delay) {
				if (diffPrev > 200) {
					prevTime = currentTime;
					setNumber(n);
					requestAnimationFrame(cb);
				} else {
					requestAnimationFrame(cb);
				}
			} else if (diffStart >= delay) {
				setNumber(targetNumber);
				return;
			}
		};

		setTimeout(() => {
			requestAnimationFrame(cb);
		}, 500);
		//eslint-disable-next-line
	}, []);
	return (
		<span className="inline-block text-5xl tabular-nums text-main">
			{number}
		</span>
	);
}
