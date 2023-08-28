import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKey';
import service from '@/service/client';

export function useGetPersonalTodayTime() {
  return useQuery({
    queryKey: [...QUERY_KEYS.getPersonalTodayTime],
    queryFn: () => service.time.getPersonalTodayTime(),
  });
}
