'use client';

import TimerSituation from '@/components/home/time/TimerSituation/TimerSituation';
import { useTimeContext } from '@/context/TimeContext';

export default function TimeSituationContainer() {
  const timeState = useTimeContext();
  return <TimerSituation {...timeState} />;
}
