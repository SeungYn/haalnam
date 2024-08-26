import { useEffect } from 'react';

/**
 * visibilityChange 이벤트를 등록해주는 훅
 * @param cb
 */
export default function useEnrollVisibilityChange(cb: () => void) {
	useEffect(() => {
		const listener = () => {
			if (document.hidden) {
				console.log('사용자가 다른 창이나 탭으로 이동했습니다.');
			} else {
				console.log('사용자가 다시 이 창으로 돌아왔습니다.');
				cb();
			}
		};
		document.addEventListener('visibilitychange', listener);

		return () => {
			document.removeEventListener('visibilitychange', listener);
		};

		// eslint-disable-next-line
	}, []);
}
