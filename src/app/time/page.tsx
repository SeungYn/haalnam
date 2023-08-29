import TimeTable from '@/components/home/time/TimeTable/TimeTable';
import TimeChart from '@/components/home/time/chart/TimeChart/TimeChart';
import TimeChartContainer from '@/container/time/TimeChartContainer';
import TimeFormContainer from '@/container/time/TimeFormContainer';
import TimeSituationContainer from '@/container/time/TimeSituationContainer';
import TimeTableContainer from '@/container/time/TimeTableContainer';

export default function page() {
  return (
    <>
      <TimeChartContainer />
      <TimeFormContainer />
      <TimeSituationContainer />
      <TimeTableContainer />
    </>
  );
}
