'use client';

import TimerSituation from '@/components/home/time/TimerSituation/TimerSituation';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import { usePostEndTime } from '@/hooks/api/time';
import { Status } from '@prisma/client';

export default function TimeSituationContainer() {
  const timeState = useTimeContext();
  const { handleEndTime } = useTimeActionContext();
  const { mutate } = usePostEndTime({ handleEndTime });

  const onEndTime = () => {
    mutate({
      subject: timeState.subject,
      status: Status.END,
      time: new Date(),
    });
  };

  if (timeState.status === 'END') return <></>;

  return <TimerSituation {...timeState} onEndTime={onEndTime} />;
}
