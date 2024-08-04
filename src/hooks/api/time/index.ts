'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKey';
import service from '@/service/client';
import { useSession } from 'next-auth/react';
import { PostTimeRequest } from '@/service/types/time';
import { TimeActionContextType } from '@/context/TimeContext';
import { toast } from 'react-toastify';
import { useInfoToast } from '@/hooks/toast';
import { Time } from '@prisma/client';

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
	handleEndTime,
}: Pick<TimeActionContextType, 'handleStartTime' | 'handleEndTime'>) {
	const queryClient = useQueryClient();
	const mutate = useMutation({
		mutationFn: ({ subject, time, status }: PostTimeRequest) =>
			service.time.postTime({ subject, time, status }),
		onMutate: ({ subject, time, status }) => {
			handleStartTime(time, subject);
			useInfoToast('타이머가 시작됐습니다!');
		},
		onSuccess: (data, params) => {},
		onError: () => {
			toast.error(`에러가 발생했습니다. 다시 시도해주세요`);
			handleEndTime();
		},
		onSettled: (data, err, params) => {
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
	handleStartTime,
}: Pick<TimeActionContextType, 'handleEndTime' | 'handleStartTime'>) {
	const queryClient = useQueryClient();
	const mutate = useMutation({
		mutationFn: ({ subject, time, status }: PostTimeRequest) =>
			service.time.postTime({ subject, time, status }),
		onMutate: ({ subject, time, status }) => {
			handleEndTime();
			useInfoToast('타이머가 종료됐습니다!');
		},
		onSuccess: (data, params) => {},
		onError: (error, params) => {
			toast.error(`에러가 발생했습니다. 다시 시도해주세요`);
			// 에러가 나면 기존의 start 했던 타이머를 불러와야함.
			const times = queryClient.getQueryData<Time[]>([
				...QUERY_KEYS.getPersonalTimesByDate,
				params.time.toDateString(),
			]);
			if (times && times.length > 0) {
				const { time, subject } = times.at(-1)!;
				handleStartTime(time, subject);
			}
		},
		onSettled: (data, err, params) => {
			queryClient.invalidateQueries([
				...QUERY_KEYS.getPersonalTimesByDate,
				params.time.toDateString(),
			]);
		},
	});

	return mutate;
}
