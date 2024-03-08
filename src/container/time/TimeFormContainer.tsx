'use client';

import TimeForm from '@/components/home/time/TimeForm.tsx/TimeForm';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import { usePostEndTime, usePostStartTime } from '@/hooks/api/time';
import { PostTimeRequest } from '@/service/types/time';
import { Status } from '@prisma/client';

export default function TimeFormContainer() {
  const { status, subject } = useTimeContext();
  const { handleStartTime, handleEndTime } = useTimeActionContext();
  const { mutate } = usePostStartTime({ handleStartTime });
  const { mutate: mutateTimeEnd } = usePostEndTime({ handleEndTime });

  const onStart = ({ subject, time, status }: PostTimeRequest) => {
    mutate({ subject, time, status });
  };

  const onEndTime = () => {
    mutateTimeEnd({
      subject,
      status: Status.END,
      time: new Date(),
    });
  };

  if (status === 'START') return <></>;

  return <TimeForm onStart={onStart} onEndTime={onEndTime} />;
}
