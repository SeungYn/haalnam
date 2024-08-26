import { useEffect, useState } from 'react';

export default function useScrollDirection(elementSelector: string) {
	const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const targetElement = document.querySelector(elementSelector);
		if (targetElement === null) return;

		const handleScroll = () => {
			const currentScrollY = targetElement.scrollTop;

			if (currentScrollY > lastScrollY) {
				setScrollDirection('down');
			} else if (currentScrollY < lastScrollY) {
				setScrollDirection('up');
			}

			setLastScrollY(currentScrollY);
		};

		targetElement.addEventListener('scroll', handleScroll);

		return () => {
			targetElement.removeEventListener('scroll', handleScroll);
		};
	}, [lastScrollY]);

	return scrollDirection;
}
