import { useState } from 'react';

/**
 * 강제 업데이트를 위해 상태를 변경하는 훅
 * @returns [number, function]
 */
export default function useForceUpdate(): [number, () => void] {
	const [count, setCount] = useState(0);

	const forceUpdate = () => {
		setCount((c) => c + 1);
	};

	return [count, forceUpdate];
}
