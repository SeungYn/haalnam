'use client';

import { Dispatch, PropsWithChildren, SetStateAction, useEffect } from 'react';
import { createPortal } from 'react-dom';

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
	/**
	 * 팝업이 닫히는 상황
	 * 1. 뒤로가기
	 * 2. 네비게이션
	 * 3. 백 스페이스
	 */
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
			if (!isFire) {
				// 마이 페이지에서만 back 호출
				const pathname = location.pathname;
				if (pathname === '/my') history.back();
			}
			window.removeEventListener('popstate', backEvent);
		};

		// eslint-disable-next-line
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<section
			className={`fixed left-0 top-0 z-[999] h-screen w-full overflow-auto bg-h_black px-4 transition-all duration-300 md:absolute md:px-0 ${isMounting ? 'translate-x-0' : 'translate-x-full'}`}
			//className={`absolute top-0 z-30 w-full grow bg-h_black px-4 !transition-all md:absolute md:px-0 ${isMounting ? 'left-0' : 'left-full'}`}
		>
			{children}
		</section>,
		document.querySelector('#time-portal')!
	);
}
