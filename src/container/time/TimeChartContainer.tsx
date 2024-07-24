'use client';

import SSRSuspense from '@/components/common/SSRSuspense';
import TimeChart from '@/components/home/time/chart/TimeChart/TimeChart';
import { useGetTimesByDate } from '@/hooks/api/time';
import { useSelectedDateStore } from '@/store/dateStore';

export default function TimeChartContainer() {
	return (
		<SSRSuspense fallback={<div>로딩중</div>}>
			<TimeChartSuspense />
		</SSRSuspense>
	);
}

function TimeChartSuspense() {
	const { selectedDate } = useSelectedDateStore();

	const { data } = useGetTimesByDate(selectedDate, true); //useGetPersonalTodayTime(true);

	if (!data) return <></>;

	return <TimeChart times={data} />;
}
