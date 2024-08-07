'use client';

import { useEffect, useState } from 'react';

export default function FlowingTIme() {
	const [number, setNumber] = useState(0);
	useEffect(() => {
		const intervalId = setInterval(() => {
			setNumber((n) => n + 1);
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);
	return <span className="inline-block tabular-nums text-main">{number}</span>;
}
