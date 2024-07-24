import WeeklyCalendar from '@/components/calendar/WeeklyCalendar/WeeklyCalendar';
import TimeChartContainer from '@/container/time/TimeChartContainer';
import TimeFormContainer from '@/container/time/TimeFormContainer';
import TimeSituationContainer from '@/container/time/TimeSituationContainer';
import TimeTableContainer from '@/container/time/TimeTableContainer';
import AuthGuarder from '@/hoc/AuthGuarder';

export default function page() {
	return (
		<AuthGuarder>
			<WeeklyCalendar />
			<TimeChartContainer />
			<TimeFormContainer />
			<TimeSituationContainer />
			<TimeTableContainer />
		</AuthGuarder>
	);
}
