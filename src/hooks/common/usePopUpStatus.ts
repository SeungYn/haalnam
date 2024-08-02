import { useEffect, useState } from 'react';

export default function usePopUpStatus() {
	const [isMounting, setIsMounting] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	// popUp open effect
	useEffect(() => {
		if (isOpen) {
			setIsMounting(true);
		} else {
			setIsMounting(false);
		}
	}, [isOpen]);

	// popUp close effect
	useEffect(() => {
		const event = () => {
			setIsOpen(false);
		};
		if (!isMounting) {
			setTimeout(event, 150);
		}
	}, [isMounting]);

	return { isMounting, isOpen, setIsOpen, setIsMounting };
}
