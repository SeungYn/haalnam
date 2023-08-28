'use client';

import TimeForm from '@/components/home/time/TimeForm.tsx/TimeForm';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import { useGetPersonalTodayTime } from '@/hooks/api/time';

export default function TimeFormContainer() {
  const { status } = useTimeContext();
  const { handleStartTime } = useTimeActionContext();
  const { data } = useGetPersonalTodayTime();

  if (status === 'START') return <></>;
  console.log(data);

  return <TimeForm onStart={handleStartTime} />;
}
