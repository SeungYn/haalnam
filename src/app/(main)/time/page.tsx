'use client';

import WeeklyCalendar from '@/components/calendar/WeeklyCalendar/WeeklyCalendar';
import TimeChartContainer from '@/container/time/TimeChartContainer';
import TimeFormContainer from '@/container/time/TimeFormContainer';
import TimeSituationContainer from '@/container/time/TimeSituationContainer';
import TimeTableContainer from '@/container/time/TimeTableContainer';
import { useSelectedDateStore } from '@/store/dateStore';

export default function MyTimerPage() {
	const { selectedDate, setSelectedDate } = useSelectedDateStore();

	return (
		<>
			<WeeklyCalendar
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>
			<TimeChartContainer />
			<TimeFormContainer />
			<TimeSituationContainer />
			<TimeTableContainer />
		</>
	);
}
