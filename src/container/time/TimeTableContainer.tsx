'use client';

import { useGetTimesByDate } from '@/hooks/api/time';
import TimeTable from '@/components/home/time/TimeTable/TimeTable';
import SSRSuspense from '@/components/common/SSRSuspense';
import { useSelectedDateStore } from '@/store/dateStore';

export default function TimeTableContainer() {
	return (
		<SSRSuspense fallback={<div>로딩 중</div>}>
			<TimeTableSuspense />
		</SSRSuspense>
	);
}

function TimeTableSuspense() {
	const { selectedDate } = useSelectedDateStore();
	const { data } = useGetTimesByDate(selectedDate, true);

	if (!data) return <></>;

	return <TimeTable times={data} />;
}
