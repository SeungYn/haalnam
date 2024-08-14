import Link from 'next/link';
import { IoHomeIcon, IoListIcon, IoPersonIcon, IoTimeIcon } from '../../icons';
import { interFont } from '@/fonts';
import style from './Sidebar.module.css';

export default function Sidebar() {
	return (
		<nav className={`${interFont.variable} ${style.sidebar} `}>
			<Link href={'/'} className={`${style.sidebar__item} `}>
				<IoHomeIcon className="text-[24px] md:text-[28px]" />
				<span>홈</span>
			</Link>
			<Link href={'/time'} className={`${style.sidebar__item} `}>
				<IoTimeIcon className="text-[24px] md:text-[28px]" />
				<span>타이머</span>
			</Link>
			<Link href={'/list'} className={`${style.sidebar__item} `}>
				<IoListIcon className="text-[24px] md:text-[28px]" />
				<span>리스트</span>
			</Link>
			<Link href={'/my'} className={`${style.sidebar__item} `}>
				<IoPersonIcon className="text-[24px] md:text-[28px]" />
				<span>내정보</span>
			</Link>
		</nav>
	);
}
