'use client';

import TimeForm from '@/components/home/time/TimeForm.tsx/TimeForm';
import { useTimeActionContext } from '@/context/TimeContext';

export default function TimeFormContainer() {
  const { startTime } = useTimeActionContext();
  return <TimeForm onStart={startTime} />;
}
