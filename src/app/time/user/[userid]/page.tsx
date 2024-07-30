'use client';

import WeeklyCalendar from '@/components/calendar/WeeklyCalendar/WeeklyCalendar';
import SSRSuspense from '@/components/common/SSRSuspense';
import DateBanner from '@/components/date/DateBanner';
import TimeChart from '@/components/home/time/chart/TimeChart/TimeChart';
import TimeChartSkeleton from '@/components/home/time/chart/TimeChart/TimeChartSkeleton';
import TimeTable from '@/components/home/time/TimeTable/TimeTable';
import TimeTableSkeleton from '@/components/home/time/TimeTable/TimeTableSkeleton';
import { useOtherUserSelectedDateContext } from '@/context/OtherUserTimeContext';
import { useGetTimesByuserNidAndDate } from '@/hooks/api/time';
import { useParams } from 'next/navigation';

type Props = {
	params: { userid: string };
};

export default function UserTimePage({ params }: Props) {
	const { userid } = params;

	if (Number.isNaN(Number(userid))) {
		throw new Error('사용자가 존재하지 않습니다');
	}
	const { selectedDate, setSelectedDate } = useOtherUserSelectedDateContext();

	return (
		<>
			<WeeklyCalendar
				selectedDate={selectedDate}
				setSelectedDate={(d: Date) => {
					setSelectedDate(d);
				}}
			/>
			<SSRSuspense fallback={<TimeChartSkeleton />}>
				<OtherUserTimeChartContainer />
			</SSRSuspense>
			<DateBanner time={selectedDate} />
			<SSRSuspense fallback={<TimeTableSkeleton />}>
				<OtherUserTimeTableContainer />
			</SSRSuspense>
		</>
	);
}

export function OtherUserTimeChartContainer() {
	const params = useParams<{ userid: string }>();

	const { selectedDate } = useOtherUserSelectedDateContext();
	const { data } = useGetTimesByuserNidAndDate(+params.userid, selectedDate);

	return <TimeChart times={data!} />;
}

export function OtherUserTimeTableContainer() {
	const params = useParams<{ userid: string }>();

	const { selectedDate } = useOtherUserSelectedDateContext();

	const { data } = useGetTimesByuserNidAndDate(+params.userid, selectedDate);

	return <TimeTable times={data!} />;
}
