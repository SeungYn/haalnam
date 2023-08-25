'use client';

import TimerSituation from '@/components/home/time/TimerSituation/TimerSituation';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';

export default function TimeSituationContainer() {
  const timeState = useTimeContext();
  const { handleEndTime } = useTimeActionContext();

  if (timeState.status === 'END') return <></>;

  return <TimerSituation {...timeState} onEndTime={handleEndTime} />;
}
