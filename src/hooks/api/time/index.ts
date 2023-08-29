'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKey';
import service from '@/service/client';
import { useSession } from 'next-auth/react';
import { PostTimeRequest } from '@/service/types/time';
import { TimeActionContextType } from '@/context/TimeContext';

export function useGetPersonalTodayTime(isSuspense: boolean = false) {
  const { data: session } = useSession();

  return useQuery({
    queryKey: [...QUERY_KEYS.getPersonalTodayTime],
    queryFn: () => service.time.getPersonalTodayTime(),
    suspense: true,
    enabled: !!session,
  });
}

export function usePostTime({
  handleStartTime,
}: Pick<TimeActionContextType, 'handleStartTime'>) {
  const mutate = useMutation({
    mutationFn: ({ subject, time, status }: PostTimeRequest) =>
      service.time.postTime({ subject, time, status }),
    onMutate: ({ subject, time, status }) => {
      handleStartTime(time, subject);
    },
  });

  return mutate;
}
