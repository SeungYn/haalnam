import { useEffect, useState } from 'react';

export default function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	// 모바일 감지 이펙트
	useEffect(() => {
		const isMouseOrTouchPad = window.matchMedia(
			'(hover: hover) and (pointer: fine)'
		).matches;

		if (!isMouseOrTouchPad) {
			setIsMobile(true);
		}
	}, []);

	return isMobile;
}
