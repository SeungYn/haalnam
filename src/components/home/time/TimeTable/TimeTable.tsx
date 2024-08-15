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

type Props = {
	times: Time[];
};
type FlatedTime = {
	start: Time;
	end?: Time;
	parseTime: string;
	status: string;
};

type ClickedItem = (FlatedTime & { x: number; y: number }) | null;

export default function TimeTable({ times = [] }: Props) {
	const [clickedItem, setClickedItem] = useState<ClickedItem>(null);
	const tableRef = useRef<HTMLDivElement>(null);
	const { initDialog, reset } = useDialogContext();
	const deleteMutate = useDeleteTimes(() => reset());

	let filteredData: FlatedTime[] = times.flatMap((currentItem, i) => {
		// 마지막이 start일 경우

		if (i === times.length - 1 && times.length % 2) {
			return [
				{
					start: currentItem,
					parseTime: `${formatDisplayTime(currentItem.time)} ~ `,
					status: '시작',
				},
			];
		}

		// 홀수 아이템
		if (i % 2) return [];

		// 짝수 아이템
		if (i <= times.length - 2 && i % 2 === 0) {
			return [
				{
					start: currentItem,
					end: times[i + 1],
					parseTime: `${formatDisplayTime(
						currentItem.time
					)} ~ ${formatDisplayTime(times[i + 1].time)}`,
					status: '종료',
				},
			];
		}

		return [];
	}) as FlatedTime[];

	const deleteDialog = (item: ClickedItem) => {
		if (!item?.end) {
			toast.error('현재 진행중인 타이머는 삭제할 수 없습니다!');
			return;
		}

		initDialog({
			title: '기록된 시간이 삭제됩니다!',
			body: (
				<>
					<p className="text-h_gray_semi_light">
						<span>주제: {item!.start.subject}</span>
					</p>
					<p className="text-h_gray_semi_light">
						<span>시간: {item!.parseTime}</span>
					</p>
				</>
			),
			actionType: 'CONFIRM_CANCEL',
			cancel: () => {
				reset();
			},
			confirm: () => {
				deleteMutate.mutate({ start: item!.start.id, end: item!.end?.id });
			},
		});
	};

	useEffect(() => {
		const cb = (e: MouseEvent) => {
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
	}, []);

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
			{filteredData.map((item) => (
				<div
					key={item.parseTime}
					className={`${styles.columnContainer} cursor-pointer border-b border-h_gray bg-h_black text-xl hover:bg-h_light_black`}
					onClick={(e) => {
						e.stopPropagation();

						setClickedItem({ ...item, x: e.clientX, y: e.clientY });
					}}
				>
					<span className="overflow-hidden">{item.start.subject}</span>
					<span>{item.parseTime}</span>
					<span>
						{item.end
							? toSecondsByMilliseconds(
									differenceTime(item.start.time, item.end.time)
								)
							: ''}
					</span>
					<span>{item.status}</span>
				</div>
			))}

			{clickedItem && (
				<ul
					className="fixed z-50 w-28 select-none overflow-hidden rounded-lg border border-white bg-h_gray_semi_dark text-center text-xl transition-all"
					style={{ left: clickedItem.x, top: clickedItem.y }}
				>
					<li
						onClick={(e) => {
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
		</div>
	);
}
