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
	searchParams: { nickname: string };
};

export default function UserTimePage({ params, searchParams }: Props) {
	const { userid } = params;
	const { nickname } = searchParams;

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
				nickname={nickname}
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

function OtherUserTimeChartContainer() {
	const params = useParams<{ userid: string }>();

	const { selectedDate } = useOtherUserSelectedDateContext();
	const { data } = useGetTimesByuserNidAndDate(+params.userid, selectedDate);

	return <TimeChart times={data!} />;
}

function OtherUserTimeTableContainer() {
	const params = useParams<{ userid: string }>();

	const { selectedDate } = useOtherUserSelectedDateContext();

	const { data } = useGetTimesByuserNidAndDate(+params.userid, selectedDate);

	return <TimeTable times={data!} />;
}
