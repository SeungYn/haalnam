'use client';

import TimeForm from '@/components/home/time/TimeForm.tsx/TimeForm';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import { useGetPersonalTodayTime, usePostTime } from '@/hooks/api/time';
import { PostTimeRequest } from '@/service/types/time';

export default function TimeFormContainer() {
  const { status } = useTimeContext();
  const { handleStartTime } = useTimeActionContext();
  const { mutate } = usePostTime({ handleStartTime });

  const onStart = ({ subject, time, status }: PostTimeRequest) => {
    mutate({ subject, time, status });
  };

  if (status === 'START') return <></>;

  return <TimeForm onStart={onStart} />;
}
