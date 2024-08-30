import { useEffect, useState } from 'react';

export default function usePopUpStatus(delay: number = 150, cb?: () => void) {
	const [isMounting, setIsMounting] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	// popUp open effect
	useEffect(() => {
		if (isOpen) {
			// 다음 스택에 열리도록 수정
			setTimeout(() => setIsMounting(true), 0);
			// 팝업 열리면 스크롤 막음
			//document.querySelector('main')!.style.overflowY = 'hidden';
		} else {
			setIsMounting(false);
			cb?.();
			//document.querySelector('main')!.style.overflowY = 'auto';
		}
	}, [isOpen]);

	// popUp close effect
	useEffect(() => {
		const event = () => {
			setIsOpen(false);
		};
		if (!isMounting) {
			setTimeout(event, delay);
		}

		// eslint-disable-next-line
	}, [isMounting]);

	return { isMounting, isOpen, setIsOpen, setIsMounting };
}
