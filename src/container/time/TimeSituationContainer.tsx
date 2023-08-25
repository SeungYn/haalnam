'use client';

import TimerSituation from '@/components/home/time/TimerSituation/TimerSituation';
import { useTimeContext } from '@/context/TimeContext';

export default function TimeSituationContainer() {
  const timeState = useTimeContext();

  if (timeState.status === 'END') return <></>;

  return <TimerSituation {...timeState} />;
}
