import WeeklyCalendar from '@/components/calendar/WeeklyCalendar/WeeklyCalendar';
import TimeChartContainer from '@/container/time/TimeChartContainer';
import TimeFormContainer from '@/container/time/TimeFormContainer';
import TimeSituationContainer from '@/container/time/TimeSituationContainer';
import TimeTableContainer from '@/container/time/TimeTableContainer';

export default function page() {
	return (
		<>
			<WeeklyCalendar />
			<TimeChartContainer />
			<TimeFormContainer />
			<TimeSituationContainer />
			<TimeTableContainer />
		</>
	);
}
