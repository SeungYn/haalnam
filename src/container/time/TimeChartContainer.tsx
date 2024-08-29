'use client';

import SSRSuspense from '@/components/common/SSRSuspense';
import TimeChart from '@/components/home/time/chart/TimeChart/TimeChart';
import TimeChartSkeleton from '@/components/home/time/chart/TimeChart/TimeChartSkeleton';
import { useGetTimesByDate } from '@/hooks/api/time';
import { useSelectedDateStore } from '@/store/dateStore';

export default function TimeChartContainer() {
	return (
		<SSRSuspense fallback={<TimeChartSkeleton />}>
			<TimeChartSuspense />
		</SSRSuspense>
	);
}

function TimeChartSuspense() {
	const { selectedDate } = useSelectedDateStore();

	const { data } = useGetTimesByDate(selectedDate, true); //useGetPersonalTodayTime(true);

	return (
		<div className="my-10">
			<TimeChart times={data!} />
		</div>
	);
}
