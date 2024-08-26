'use client';

import { IoIosArrowBackIcon } from '@/components/icons';
import useScrollDirection from '@/hooks/common/useScrollDirection';

export default function CommonPopUpHeader({
	title,
	onEvent,
}: {
	onEvent: () => void;
	title: string;
}) {
	const dir = useScrollDirection('#popup-container');

	return (
		<nav
			className={`sticky left-0 transition-all ${dir === 'down' ? '-translate-y-full' : 'translate-y-0'} top-0 z-50 mb-12 flex items-center gap-8 bg-h_black py-2`}
		>
			<IoIosArrowBackIcon
				size="large"
				onClick={() => onEvent()}
				className="cursor-pointer"
			/>
			<span className="text-3xl font-bold">{title}</span>
		</nav>
	);
}
