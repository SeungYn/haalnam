import Link from 'next/link';
import HomeIcon from '../icons/HomeIcon';
import HistoryIcon from '../icons/HistoryIcon';

export default function Sidebar() {
  return (
    <nav className='px-2 py-4 flex flex-col gap-2 bg-red-400 rounded-tr-lg rounded-br-lg'>
      <Link href={'/'}>
        <HomeIcon size='large' />
      </Link>
      <Link href={'#'}>
        <HistoryIcon size='large' />
      </Link>
    </nav>
  );
}
