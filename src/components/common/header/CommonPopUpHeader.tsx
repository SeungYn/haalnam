import { IoIosArrowBackIcon } from '@/components/icons';

export default function CommonPopUpHeader({
	title,
	onEvent,
}: {
	onEvent: () => void;
	title: string;
}) {
	return (
		<nav className="sticky left-0 top-0 z-10 mb-12 flex items-center gap-8 bg-h_black py-4">
			<IoIosArrowBackIcon
				size="large"
				onClick={() => onEvent()}
				className="cursor-pointer"
			/>
			<span className="text-3xl font-bold">{title}</span>
		</nav>
	);
}
