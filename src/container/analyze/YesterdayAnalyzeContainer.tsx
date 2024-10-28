'use client';

import YesterdayAnalze from '@/components/analyze/YesterdayAnalze';
import SSRSuspense from '@/components/common/SSRSuspense';
import TimeChartSkeleton from '@/components/home/time/chart/TimeChart/TimeChartSkeleton';
import { useAWeekTimes, useGetTimesByDate } from '@/hooks/api/time';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import { formatBroswerTime } from '@/utils/date';
import { Time } from '@prisma/client';
import { PropsWithChildren } from 'react';

type YesterdayAnalyzeContainerType = {};
export default function YesterdayAnalyzeContainer({
	children,
}: PropsWithChildren<YesterdayAnalyzeContainerType>) {
	return (
		<SSRSuspense
			fallback={
				<div
					className="flex justify-center"
					style={{ paddingBottom: '2.5rem' }}
				>
					<TimeChartSkeleton />
				</div>
			}
		>
			{children}
		</SSRSuspense>
	);
}

type YesterdayAnalyzeSuspenseType = Pick<
	ReturnType<typeof usePopUpStatus>,
	'setIsMounting'
>;
export function YesterdayAnalyzeSuspense({
	setIsMounting,
}: YesterdayAnalyzeSuspenseType) {
	const yesterDay = new Date();
	yesterDay.setDate(yesterDay.getDate() - 1);

	const { data } = useGetTimesByDate(yesterDay, true);
	const res = useAWeekTimes(new Date());

	let betweenTimes: Time[] = [];

	// 날짜별 총 사용 시간 구하기
	const aWeekTotalTimesByDate: { time: number; date: Date }[] = [];

	for (let i = 0; i < res.length; i++) {
		const { data } = res[i];
		let hours = 0;
		for (let time of data!.data) {
			if (time.endTime === null) continue;
			const startTime = formatBroswerTime(time.startTime);
			const endTime = formatBroswerTime(time.endTime);

			const diffTime = endTime.getTime() - startTime.getTime();
			hours += diffTime / (1000 * 60 * 60);
		}

		aWeekTotalTimesByDate.push({
			time: Number(hours.toFixed(1)),
			date: formatBroswerTime(data!.date),
		});
	}

	// 타이머 사이 시간 구하기
	for (let i = 0; i < data!.length - 1; i++) {
		const currentTime = data![i];
		const nextTime = data![i + 1];
		if (!currentTime.endTime) break;
		betweenTimes.push({
			...currentTime,
			subject: '빈 시간',
			startTime: currentTime.endTime,
			endTime: nextTime.startTime,
		});
	}

	// console.log(betweenTimes);
	return (
		<YesterdayAnalze
			times={data!}
			aWeekTotalTimesByDate={aWeekTotalTimesByDate}
			betweenTimes={betweenTimes}
			setOpen={setIsMounting}
		/>
	);
}
