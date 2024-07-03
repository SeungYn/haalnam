'use client';

import { useGetPersonalTodayTime } from '@/hooks/api/time';
import TimeTable from '@/components/home/time/TimeTable/TimeTable';
import SSRSuspense from '@/components/common/SSRSuspense';
import { formatTime } from '@/utils/date';

export default function TimeTableContainer() {
  return (
    <SSRSuspense fallback={<div>로딩 중</div>}>
      <TimeTableSuspense />
    </SSRSuspense>
  );
}

function TimeTableSuspense() {
  const { data } = useGetPersonalTodayTime(true);

  return <TimeTable times={data!} />;
}
