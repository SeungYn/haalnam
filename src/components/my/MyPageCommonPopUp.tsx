'use client';

import { Dispatch, PropsWithChildren, SetStateAction, useEffect } from 'react';

type Props = {
	isMounting: boolean;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsMounting: Dispatch<SetStateAction<boolean>>;
};
export default function MyPageCommonPopUp({
	isMounting,
	isOpen,
	setIsOpen,
	setIsMounting,
	children,
}: PropsWithChildren<Props>) {
	useEffect(() => {
		if (!isOpen) return;

		let isFire = false;
		history.pushState(null, '', location.href);
		const backEvent = () => {
			isFire = true;
			setIsMounting(false);
		};
		window.addEventListener('popstate', backEvent);
		return () => {
			if (isOpen && !isFire) history.back();
			window.removeEventListener('popstate', backEvent);
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<section
			className={`fixed top-0 z-30 h-screen w-full bg-h_black px-4 transition-all md:absolute md:px-0 ${isMounting ? 'left-0' : 'left-full'}`}
		>
			{children}
		</section>
	);
}
