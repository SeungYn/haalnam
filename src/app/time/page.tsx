import TimeChart from '@/components/home/time/chart/TimeChart/TimeChart';
import TimeFormContainer from '@/container/time/TimeFormContainer';
import TimeSituationContainer from '@/container/time/TimeSituationContainer';

export default function page() {
  return (
    <>
      <TimeChart />
      <TimeFormContainer />
      <TimeSituationContainer />
    </>
  );
}
