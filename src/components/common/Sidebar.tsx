import Link from 'next/link';
import HomeIcon from '../icons/HomeIcon';
import HistoryIcon from '../icons/HistoryIcon';

export default function Sidebar() {
  return (
    <nav className='px-2 py-2 flex gap-2 bg-red-400 rounded-tr-lg rounded-br-lg sm:flex-col sm:py-4'>
      <Link href={'/'}>
        <HomeIcon size='medium' />
      </Link>
      <Link href={'/time'}>
        <HistoryIcon size='medium' />
      </Link>
    </nav>
  );
}
