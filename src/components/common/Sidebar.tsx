import Link from 'next/link';
import HomeIcon from '../icons/HomeIcon';
import HistoryIcon from '../icons/HistoryIcon';

export default function Sidebar() {
	return (
		<nav className="flex gap-2 border-t border-h_gray bg-h_black px-2 py-2 sm:flex-col sm:rounded-br-lg sm:rounded-tr-lg sm:border sm:border-l-0 sm:py-4">
			<Link href={'/'}>
				<HomeIcon size="medium" />
			</Link>
			<Link href={'/time'}>
				<HistoryIcon size="medium" />
			</Link>
		</nav>
	);
}
