'use client';

import TimerSituation from '@/components/home/time/TimerSituation/TimerSituation';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import { Status } from '@prisma/client';

export default function TimeSituationContainer() {
  const timeState = useTimeContext();
  const { handleEndTime } = useTimeActionContext();

  const onEndTime = () => {
    const formData = new FormData();
    formData.append('subject', timeState.subject);
    formData.append('status', Status.END);

    fetch('/api/time', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (res.ok) handleEndTime();
        return res.json();
      })
      .then((data) => console.log(data));
  };

  if (timeState.status === 'END') return <></>;

  return <TimerSituation {...timeState} onEndTime={onEndTime} />;
}
