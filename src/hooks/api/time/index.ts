'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
    suspense: isSuspense,
    enabled: !!session,
  });
}

export function usePostStartTime({
  handleStartTime,
}: Pick<TimeActionContextType, 'handleStartTime'>) {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: ({ subject, time, status }: PostTimeRequest) =>
      service.time.postTime({ subject, time, status }),
    onMutate: ({ subject, time, status }) => {
      handleStartTime(time, subject);
    },
    onSuccess: (data) => {
      console.log('시작됨', data);
      queryClient.invalidateQueries([...QUERY_KEYS.getPersonalTodayTime]);
    },
  });

  return mutate;
}

export function usePostEndTime({
  handleEndTime,
}: Pick<TimeActionContextType, 'handleEndTime'>) {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: ({ subject, time, status }: PostTimeRequest) =>
      service.time.postTime({ subject, time, status }),
    onMutate: ({ subject, time, status }) => {
      handleEndTime();
    },
    onSuccess: () => {
      queryClient.invalidateQueries([...QUERY_KEYS.getPersonalTodayTime]);
    },
  });

  return mutate;
}
