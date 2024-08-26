/* eslint-disable */
'use client';

import CommonPopUpHeader from '@/components/common/header/CommonPopUpHeader';
import TimePopUp from '@/components/home/time/TimePopUp/TimePopUp';
import {
	IoTimerOutlineIcon,
	IoAddIcon,
	IoReaderOutlineIcon,
} from '@/components/icons';
import { interFont } from '@/fonts';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import { useState } from 'react';
import PlanTimeChartAddFormContainer from '../time/chart/PlanTimeChartAddFormContainer/PlanTimeChartAddFormContainer';

export default function PlanSideButton() {
	const [isOpen, setIsOpen] = useState(false);
	const {
		isMounting,
		isOpen: isPopupOpen,
		setIsOpen: setIsPopupOpen,
		setIsMounting,
	} = usePopUpStatus(300);

	return (
		<>
			{isOpen && (
				<section
					className="fixed left-0 top-0 z-[9998] h-screen w-screen bg-black opacity-70"
					onClick={() => setIsOpen(false)}
				></section>
			)}

			<aside
				className={`z-[99999] select-none ${interFont.className} fixed bottom-28 right-10 flex flex-col-reverse items-end gap-4 text-xl font-bold md:bottom-10`}
			>
				<button
					className="flex items-center gap-5 rounded-full border border-white bg-h_black p-2"
					onClick={() => setIsOpen((f) => !f)}
				>
					<IoAddIcon size="medium" />
				</button>
				<ul
					className={`flex flex-col-reverse gap-4 ${isOpen ? 'visible flex translate-y-0 opacity-100' : 'invisible hidden translate-y-10 opacity-0'} transition-all`}
				>
					<li
						className="flex items-center gap-5 border-none"
						role="button"
						onClick={() => {
							setIsPopupOpen(true);
							setIsOpen(false);
						}}
					>
						<p>시간 추가 </p>{' '}
						<div className="rounded-full border border-white p-2">
							<IoTimerOutlineIcon size="medium" />
						</div>
					</li>
					<li
						className="flex items-center gap-5 border-none"
						role="button"
						onClick={() => {
							setIsPopupOpen(true);
							setIsOpen(false);
						}}
					>
						<p>투두 추가</p>{' '}
						<div className="rounded-full border border-white p-2">
							<IoReaderOutlineIcon size="medium" />
						</div>
					</li>
				</ul>
			</aside>

			<TimePopUp
				isMounting={isMounting}
				isOpen={isPopupOpen}
				setIsOpen={setIsPopupOpen}
				setIsMounting={setIsMounting}
			>
				<CommonPopUpHeader
					title={'계획 추가'}
					onEvent={() => setIsMounting(false)}
				/>
				<div>
					<PlanTimeChartAddFormContainer
						closePopUp={() => setIsMounting(false)}
					/>
				</div>
			</TimePopUp>
		</>
	);
}
