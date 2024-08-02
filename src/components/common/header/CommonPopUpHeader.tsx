import { IoIosArrowBackIcon } from '@/components/icons';

export default function CommonPopUpHeader({
	title,
	onEvent,
}: {
	onEvent: () => void;
	title: string;
}) {
	return (
		<nav className="mb-16 flex items-center gap-8 py-4">
			<IoIosArrowBackIcon
				size="large"
				onClick={() => onEvent()}
				className="cursor-pointer"
			/>
			<span className="text-3l">{title}</span>
		</nav>
	);
}
