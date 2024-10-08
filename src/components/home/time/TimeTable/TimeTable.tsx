'use client';

import {
	differenceTime,
	formatDisplayTime,
	toSecondsByMilliseconds,
} from '@/utils/date';
import styles from './TimeTable.module.css';
import { Time } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { useDialogContext } from '@/context/DialogContext';
import { useDeleteTimes } from '@/hooks/api/time';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import TimePopUp from '../TimePopUp/TimePopUp';
import CommonPopUpHeader from '@/components/common/header/CommonPopUpHeader';
import TimeChartModifyFormContainer from '../chart/modify/TimeChartModifyFormContainer/TimeChartModifyFormContainer';
import { useTimeContext } from '@/context/TimeContext';

type Props = {
	times: Time[];
};

type ClickedItem = (Time & { x: number; y: number }) | null;

export default function TimeTable({ times = [] }: Props) {
	const { timeId: progressingTimeId } = useTimeContext();
	const [clickedItem, setClickedItem] = useState<ClickedItem>(null);
	const { data } = useSession();
	const tableRef = useRef<HTMLDivElement>(null);
	const { initDialog, reset } = useDialogContext();
	const {
		isMounting,
		isOpen: isPopupOpen,
		setIsOpen: setIsPopupOpen,
		setIsMounting,
	} = usePopUpStatus(300, () => {
		setClickedItem(null);
	});
	const deleteMutate = useDeleteTimes(() => reset());

	const deleteDialog = (item: ClickedItem) => {
		if (!item?.endTime) {
			toast.error('현재 진행중인 타이머는 삭제할 수 없습니다!');
			return;
		}

		const parseTime = item.endTime
			? `${formatDisplayTime(
					item.startTime
				)} ~ ${formatDisplayTime(item.endTime)}`
			: `${formatDisplayTime(item.startTime)} ~ `;

		initDialog({
			title: '기록된 시간이 삭제됩니다!',
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
				deleteMutate.mutate({ timeId: item.id });
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
				!tableRef.current?.contains(e.target as HTMLElement)
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
				<span>상태</span>
			</div>
			{times.map((item) => {
				const parseTime = item.endTime
					? `${formatDisplayTime(
							item.startTime
						)} ~ ${formatDisplayTime(item.endTime)}`
					: `${formatDisplayTime(item.startTime)} ~ `;
				return (
					// eslint-disable-next-line
					<div
						key={parseTime}
						className={`${styles.columnContainer} cursor-pointer border-b border-h_gray bg-h_black text-xl hover:bg-h_light_black`}
						onClick={(e) => {
							if (data?.user.id !== item.userId) return;
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
						<span>{item.status}</span>
					</div>
				);
			})}

			{clickedItem && (
				<div
					className="fixed z-50 flex select-none flex-col overflow-hidden rounded-lg border border-white bg-h_gray_semi_dark text-center text-2xl transition-all [&>button]:px-8 [&>button]:py-2"
					style={{ left: clickedItem.x, top: clickedItem.y }}
				>
					<button
						onClick={(e) => {
							if (data?.user.id !== clickedItem.userId) return;
							if (progressingTimeId && progressingTimeId === clickedItem.id) {
								alert('현재 진행 중인 타이머는 수정할 수 없습니다 ');
								return;
							}

							setIsPopupOpen(true);
							// setClickedItem(null);
						}}
						className="hover:bg-h_gray_semi_light"
					>
						수정하기
					</button>
					<button
						onClick={(e) => {
							if (data?.user.id !== clickedItem.userId) return;
							deleteDialog(clickedItem);
							setClickedItem(null);
						}}
						className="hover:bg-h_gray_semi_light"
					>
						삭제하기
					</button>
				</div>
			)}

			{clickedItem && (
				<TimePopUp
					isMounting={isMounting}
					isOpen={isPopupOpen}
					setIsOpen={setIsPopupOpen}
					setIsMounting={setIsMounting}
				>
					<CommonPopUpHeader
						title={'타이머 수정'}
						onEvent={() => {
							setIsMounting(false);
						}}
					/>
					<div>
						<TimeChartModifyFormContainer
							closePopUp={() => {
								setIsMounting(false);
							}}
							selectedTime={clickedItem}
							times={times}
						/>
					</div>
				</TimePopUp>
			)}
		</div>
	);
}
