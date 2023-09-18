'use client';

import SSRSuspense from '@/components/common/SSRSuspense';
import TimeChart from '@/components/home/time/chart/TimeChart/TimeChart';
import { useGetPersonalTodayTime } from '@/hooks/api/time';

export default function TimeChartContainer() {
  return (
    <SSRSuspense fallback={<div>로딩중</div>}>
      <TimeChartSuspense />
    </SSRSuspense>
  );
}

function TimeChartSuspense() {
  const { data } = useGetPersonalTodayTime(true);

  if (!data) return <></>;

  return <TimeChart times={data} />;
}
