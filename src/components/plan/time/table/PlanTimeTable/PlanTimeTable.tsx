/* eslint-disable */

'use client';

import {
	differenceTime,
	formatDisplayTime,
	formatToTimeHoursMinutes,
	toSecondsByMilliseconds,
} from '@/utils/date';
import styles from './PlanTimeTable.module.css';
import { Plan } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { useDialogContext } from '@/context/DialogContext';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useDeletePlan } from '@/hooks/api/plan';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import TimePopUp from '@/components/home/time/TimePopUp/TimePopUp';
import CommonPopUpHeader from '@/components/common/header/CommonPopUpHeader';
import PlanTimeChartModifyFormContainer from '../../chart/PlanTimeChartModifyFormContainer/PlanTimeChartModifyFormContainer';

type Props = {
	times: Plan[];
};

type ClickedItem = (Plan & { x: number; y: number }) | null;

export default function PlanTimeTable({ times = [] }: Props) {
	const [clickedItem, setClickedItem] = useState<ClickedItem>(null);
	const { data } = useSession();
	const tableRef = useRef<HTMLDivElement>(null);
	const clickedItemRef = useRef<HTMLUListElement>(null);
	const { initDialog, reset } = useDialogContext();
	const {
		isMounting,
		isOpen: isPopupOpen,
		setIsOpen: setIsPopupOpen,
		setIsMounting,
	} = usePopUpStatus(300, () => {
		setClickedItem(null);
	});
	const deleteMutate = useDeletePlan(() => reset());

	const deleteDialog = (item: ClickedItem) => {
		if (!item?.endTime) {
			toast.error('현재 진행중인 타이머는 삭제할 수 없습니다!');
			return;
		}

		const parseTime = item.endTime
			? `${formatToTimeHoursMinutes(
					formatDisplayTime(item.startTime)
				)} ~ ${formatToTimeHoursMinutes(formatDisplayTime(item.endTime))}`
			: `${formatToTimeHoursMinutes(formatDisplayTime(item.startTime))} ~ `;

		initDialog({
			title: '기록된 계획이 삭제됩니다!',
			body: (
				<>
					<p className="text-h_gray_semi_light">
						<span>주제: {item!.subject}</span>
					</p>
					<p className="text-h_gray_semi_light">
						<span>시간: {parseTime}</span>
					</p>
				</>
			),
			actionType: 'CONFIRM_CANCEL',
			cancel: () => {
				reset();
			},
			confirm: () => {
				deleteMutate.mutate({
					planPageId: item.plan_page_id!,
					planTimeId: item.id,
				});
			},
		});
	};

	useEffect(() => {
		const cb = (e: MouseEvent) => {
			// 팝업이 열려있을 때는 무시
			if (isPopupOpen) return;

			if (
				e.target !== null &&
				e.target !== tableRef.current &&
				e.target !== clickedItemRef.current &&
				!tableRef.current?.contains(e.target as HTMLElement) &&
				!clickedItemRef.current?.contains(e.target as HTMLElement)
			) {
				setClickedItem(null);
			}
		};
		document.addEventListener('click', cb);

		return () => {
			document.removeEventListener('click', cb);
		};
	}, [isPopupOpen]);

	return (
		<div
			ref={tableRef}
			className="mb-10 w-full flex-shrink-0 overflow-hidden rounded-2xl border border-h_gray bg-h_light_black"
		>
			<div
				className={`${styles.columnContainer} border-b border-h_gray text-2xl font-bold text-white`}
			>
				<span>주제</span>
				<span>기간</span>
				<span>사용시간(원)</span>
			</div>
			{times.map((item) => {
				const parseTime = item.endTime
					? `${formatToTimeHoursMinutes(
							formatDisplayTime(item.startTime)
						)} ~ ${formatToTimeHoursMinutes(formatDisplayTime(item.endTime))}`
					: `${formatToTimeHoursMinutes(formatDisplayTime(item.startTime))} ~ `;
				return (
					<div
						key={parseTime}
						className={`${styles.columnContainer} cursor-pointer border-b border-h_gray bg-h_black text-xl hover:bg-h_light_black`}
						onClick={(e) => {
							if (data?.user.id !== item.user_id) return;
							setClickedItem({ ...item, x: e.clientX, y: e.clientY });
						}}
					>
						<span className="overflow-hidden">{item.subject}</span>
						<span>{parseTime}</span>
						<span>
							{item.endTime
								? toSecondsByMilliseconds(
										differenceTime(item.startTime, item.endTime)
									)
								: ''}
						</span>
					</div>
				);
			})}

			{clickedItem && (
				<ul
					ref={clickedItemRef}
					className="fixed z-50 select-none overflow-hidden rounded-lg border border-white bg-h_gray_semi_dark text-center text-2xl transition-all [&>li]:px-8 [&>li]:py-2"
					style={{ left: clickedItem.x, top: clickedItem.y }}
				>
					<li
						onClick={(e) => {
							if (data?.user.id !== clickedItem.user_id) return;
							setIsPopupOpen(true);
							// setClickedItem(null);
						}}
						role="button"
						className="hover:bg-h_gray_semi_light"
					>
						수정하기
					</li>
					<li
						onClick={(e) => {
							if (data?.user.id !== clickedItem.user_id) return;
							deleteDialog(clickedItem);
							setClickedItem(null);
						}}
						role="button"
						className="hover:bg-h_gray_semi_light"
					>
						삭제하기
					</li>
				</ul>
			)}
			{clickedItem && (
				<TimePopUp
					isMounting={isMounting}
					isOpen={isPopupOpen}
					setIsOpen={setIsPopupOpen}
					setIsMounting={setIsMounting}
				>
					<CommonPopUpHeader
						title={'계획 수정'}
						onEvent={() => {
							setIsMounting(false);
						}}
					/>
					<div>
						<PlanTimeChartModifyFormContainer
							closePopUp={() => {
								setIsMounting(false);
							}}
							selectedPlan={clickedItem}
							plans={times}
						/>
					</div>
				</TimePopUp>
			)}
		</div>
	);
}

export function PlanTimeTableSkelton() {
	return (
		<div className="mt-20 grid w-full animate-pulse grid-cols-[21%_57%_22%] grid-rows-[minmax(3rem,_auto)] rounded-2xl bg-h_gray_semi_dark text-center text-2xl [&>span]:flex [&>span]:items-center [&>span]:justify-center">
			<span>주제</span>
			<span>기간</span>
			<span>사용시간(원)</span>
		</div>
	);
}
