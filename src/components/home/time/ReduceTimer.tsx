'use client';

import { useAddEventListenerToDocument } from '@/hooks/common';
import { useEffect, useState } from 'react';
import { Time } from './Time';
import { TimeMoney } from './TimeMoney';

const FrameSeconds = 16.7;

export function ReduceTimer() {
	const [time, setTime] = useState(getRemainingTime);

	useAddEventListenerToDocument('visibilitychange', () => {
		if (!document.hidden) {
			setTime(getRemainingTime());
		}
	});

	useEffect(() => {
		let startTime = Math.floor(performance.now());
		let animationFrameId: number;

		const onARF = (n: number) => {
			setTime((s) => s - (Math.floor(n) - startTime));
			animationFrameId = requestAnimationFrame(onARF);
		};

		animationFrameId = requestAnimationFrame(onARF);

		return () => cancelAnimationFrame(animationFrameId);
	});

	const { hours, minutes, seconds, milliseconds } = formatTime(time);

	return (
		<div className="mt-4 w-full">
			<Time
				hours={hours}
				minutes={minutes}
				seconds={seconds}
				milliseconds={milliseconds}
			/>
			<TimeMoney time={time} />
		</div>
	);
}

const reduceTime = (n: number) => parseInt(String(n - FrameSeconds));

function getRemainingTime() {
	return 86400000 - timeToMilliseconds(new Date());
}

function timeToMilliseconds(time: Date) {
	const hours = time.getHours();
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();
	const milliseconds = time.getMilliseconds();

	return (
		hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000 + milliseconds
	);
}

function formatTime(milliseconds: number) {
	const seconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	const remainingMilliseconds = milliseconds % 1000;
	const remainingSeconds = seconds % 60;
	const remainingMinutes = minutes % 60;

	return {
		hours,
		minutes: remainingMinutes,
		seconds: remainingSeconds,
		milliseconds: remainingMilliseconds,
	};
}
