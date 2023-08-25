'use client';

import TimeForm from '@/components/home/time/TimeForm.tsx/TimeForm';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';

export default function TimeFormContainer() {
  const { status } = useTimeContext();
  const { handleStartTime } = useTimeActionContext();

  if (status === 'START') return <></>;

  return <TimeForm onStart={handleStartTime} />;
}
