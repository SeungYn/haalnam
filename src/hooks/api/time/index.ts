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
		// initialData: [],
		suspense: true,
		enabled: !!session,
	});
}

/**
 * 날짜를 기반으로 사용자의 시간표들을 가져오는 hook
 * @param date
 * @param isSuspense
 * @returns
 */
export function useGetTimesByDate(date: Date, isSuspense: boolean = false) {
	const { data: session } = useSession();

	return useQuery({
		queryKey: [...QUERY_KEYS.getPersonalTimesByDate, date.toDateString()],
		queryFn: () => service.time.getTimesByDate(date),
		suspense: true,
		// initialData: [],
		enabled: !!session,
	});
}

export function useGetTimesByuserNidAndDate(
	userNid: number,
	date: Date,
	isSuspense: boolean = false
) {
	const { data: session } = useSession();
	return useQuery({
		queryKey: [userNid, date.toDateString()],
		queryFn: () => service.time.getTimesByUserNidAndDate(userNid, date),
		suspense: true,
		// initialData: [],
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
		onSuccess: (data, params) => {
			queryClient.invalidateQueries([
				...QUERY_KEYS.getPersonalTimesByDate,
				params.time.toDateString(),
			]);
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
		onSuccess: (data, params) => {
			queryClient.invalidateQueries([
				...QUERY_KEYS.getPersonalTimesByDate,
				params.time.toDateString(),
			]);
		},
	});

	return mutate;
}
