'use client';

import { HTMLAttributes, useState } from 'react';

export default function PlanNavbar() {
	const [category, setCategory] = useState(true);

	return (
		<nav className="relative flex w-full border-b-4 border-h_light_black py-4">
			<PlanNavbarButton
				className={`${category ? 'text-white' : 'text-h_light_black'}`}
				onClick={() => setCategory(true)}
			>
				계획
			</PlanNavbarButton>
			<PlanNavbarButton
				className={`${category ? 'text-h_light_black' : 'text-white'}`}
				onClick={() => {
					alert('준비 중입니다..');
					return;
					setCategory(false);
				}}
			>
				투두
			</PlanNavbarButton>
			<div
				className={`absolute transition-all ${category ? 'left-1/4' : 'left-3/4'} top-full h-[4px] w-1/3 -translate-x-1/2 bg-white`}
			></div>
		</nav>
	);
}

function PlanNavbarButton({
	className,
	...res
}: HTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={`basis-1/2 text-2xl ${className ? className : ''}`}
			{...res}
		/>
	);
}
