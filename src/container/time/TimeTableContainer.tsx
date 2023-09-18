'use client';

import { useGetPersonalTodayTime } from '@/hooks/api/time';
import TimeTable from '@/components/home/time/TimeTable/TimeTable';
import SSRSuspense from '@/components/common/SSRSuspense';

export default function TimeTableContainer() {
  return (
    <SSRSuspense fallback={<div>로딩 중</div>}>
      <TimeTableSuspense />
    </SSRSuspense>
  );
}

function TimeTableSuspense() {
  const { data } = useGetPersonalTodayTime(true);

  if (!data) return;
  return <TimeTable times={data!} />;
}
