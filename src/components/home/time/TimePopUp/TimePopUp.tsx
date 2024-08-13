'use client';
import { Dispatch, PropsWithChildren, SetStateAction, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	isMounting: boolean;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsMounting: Dispatch<SetStateAction<boolean>>;
};

export default function TimePopUp({
	isMounting,
	isOpen,
	setIsOpen,
	setIsMounting,
	children,
}: PropsWithChildren<Props>) {
	// useEffect(() => {
	// 	if (!isOpen) return;

	// 	let isFire = false;
	// 	history.pushState(null, '', location.href);
	// 	const backEvent = () => {
	// 		isFire = true;
	// 		setIsMounting(false);
	// 	};
	// 	window.addEventListener('popstate', backEvent);
	// 	return () => {
	// 		if (isOpen && !isFire) history.back();
	// 		window.removeEventListener('popstate', backEvent);
	// 	};
	// }, [isOpen]);

	if (!isOpen) return null;

	// 부모는 main 태그임
	return createPortal(
		<section
			className={`absolute top-0 z-[100] h-full w-full bg-h_black px-4 transition-all md:absolute md:px-0 ${isMounting ? 'top-0' : 'top-full'}`}
		>
			{children}
		</section>,
		document.querySelector('#time-portal')!
	);
}
