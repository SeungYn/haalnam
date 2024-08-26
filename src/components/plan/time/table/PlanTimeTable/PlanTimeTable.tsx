/* eslint-disable */

'use client';

import {
	differenceTime,
	formatDisplayTime,
	toSecondsByMilliseconds,
} from '@/utils/date';
import styles from './PlanTimeTable.module.css';
import { Plan } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { useDialogContext } from '@/context/DialogContext';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useDeletePlan } from '@/hooks/api/plan';

type Props = {
	times: Plan[];
};

type ClickedItem = (Plan & { x: number; y: number }) | null;

export default function PlanTimeTable({ times = [] }: Props) {
	const [clickedItem, setClickedItem] = useState<ClickedItem>(null);
	const { data } = useSession();
	const tableRef = useRef<HTMLDivElement>(null);
	const { initDialog, reset } = useDialogContext();
	const deleteMutate = useDeletePlan(() => reset());

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
			</div>
			{times.map((item) => {
				const parseTime = item.endTime
					? `${formatDisplayTime(
							item.startTime
						)} ~ ${formatDisplayTime(item.endTime)}`
					: `${formatDisplayTime(item.startTime)} ~ `;
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
					className="fixed z-50 w-28 select-none overflow-hidden rounded-lg border border-white bg-h_gray_semi_dark text-center text-xl transition-all"
					style={{ left: clickedItem.x, top: clickedItem.y }}
				>
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
		</div>
	);
}
