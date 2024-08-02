'use client';

import { useGetTimesByDate } from '@/hooks/api/time';
import TimeTable from '@/components/home/time/TimeTable/TimeTable';
import SSRSuspense from '@/components/common/SSRSuspense';
import { useSelectedDateStore } from '@/store/dateStore';
import TimeTableSkeleton from '@/components/home/time/TimeTable/TimeTableSkeleton';

export default function TimeTableContainer() {
	return (
		<SSRSuspense fallback={<TimeTableSkeleton />}>
			<TimeTableSuspense />
		</SSRSuspense>
	);
}

function TimeTableSuspense() {
	const { selectedDate } = useSelectedDateStore();
	const { data } = useGetTimesByDate(selectedDate, true);

	return <TimeTable times={data!} />;
}
