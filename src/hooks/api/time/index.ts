'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKey';
import service from '@/service/client';
import { useSession } from 'next-auth/react';

export function useGetPersonalTodayTime(isSuspense: boolean = false) {
  const { data: session } = useSession();

  return useQuery({
    queryKey: [...QUERY_KEYS.getPersonalTodayTime],
    queryFn: () => service.time.getPersonalTodayTime(),
    suspense: true,
    enabled: !!session,
  });
}
