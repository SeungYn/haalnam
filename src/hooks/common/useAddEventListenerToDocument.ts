import { useEffect } from 'react';

export function useAddEventListenerToDocument<K extends keyof WindowEventMap>(
	type: K,
	callback: (e: WindowEventMap[K]) => void
) {
	useEffect(() => {
		window.addEventListener(type, callback);

		return () => {
			window.removeEventListener(type, callback);
		};
	}, [callback, type]);
}
