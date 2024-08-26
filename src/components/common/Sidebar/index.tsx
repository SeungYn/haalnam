'use client';

import Link from 'next/link';
import {
	IoHomeIcon,
	IoListIcon,
	IoPersonIcon,
	IoPlanIcon,
	IoTimeIcon,
} from '../../icons';
import { interFont } from '@/fonts';
import style from './Sidebar.module.css';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
	const path = usePathname();

	return (
		<nav className={`${interFont.variable} ${style.sidebar} select-none`}>
			<Link href={'/'} className={`${style.sidebar__item} `}>
				<IoHomeIcon
					className="text-[24px] md:text-[28px]"
					accent={path === '/'}
				/>
				<span>홈</span>
			</Link>
			<Link href={'/plan'} className={`${style.sidebar__item} `}>
				<IoPlanIcon
					className="text-[24px] md:text-[28px]"
					accent={path === '/plan'}
				/>
				<span>계획</span>
			</Link>
			<Link href={'/time'} className={`${style.sidebar__item} `}>
				<IoTimeIcon
					className="text-[24px] md:text-[28px]"
					accent={path === '/time'}
				/>
				<span>타이머</span>
			</Link>
			<Link href={'/list'} className={`${style.sidebar__item} `}>
				<IoListIcon
					className="text-[24px] md:text-[28px]"
					accent={path === '/list'}
				/>
				<span>리스트</span>
			</Link>
			<Link href={'/my'} className={`${style.sidebar__item} `}>
				<IoPersonIcon
					className="text-[24px] md:text-[28px]"
					accent={path === '/my'}
				/>
				<span>내정보</span>
			</Link>
		</nav>
	);
}
