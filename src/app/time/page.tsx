import TimeForm from '@/components/home/time/TimeForm.tsx/TimeForm';
import TimeChart from '@/components/home/time/chart/TimeChart/TimeChart';
// import TaskListChart from '@/components/home/time/chart/TestChart';

export default function page() {
  return (
    <>
      <TimeChart />
      <TimeForm />
    </>
  );
}
