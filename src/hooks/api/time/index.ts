'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKey';
import service from '@/service/client';
import { useSession } from 'next-auth/react';
import { StartTimerRequest, StopTimerRequest } from '@/service/types/time';
import { TimeActionContextType } from '@/context/TimeContext';
import { toast } from 'react-toastify';
import { useInfoToast } from '@/hooks/toast';
import { Time } from '@prisma/client';
import { isAxiosError } from 'axios';
import { ExceptionCode, ExceptionRes } from '@/utils/exception';
import { formatBroswerTime } from '@/utils/date';

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
 * 날짜를 기반으로 사용자 개인의 시간표들을 가져오는 hook
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

/**
 * 날짜를 기반으로 사용자 개인의 시간표들을 가져오는 hook
 * @param date
 * @param isSuspense
 * @returns
 */
export function useGetTimesByDateNotSuspense(date: Date) {
	const { data: session } = useSession();

	return useQuery({
		queryKey: [...QUERY_KEYS.getPersonalTimesByDate, date.toDateString()],
		queryFn: () => service.time.getTimesByDate(date),
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
		mutationFn: ({ subject, time, status }: StartTimerRequest) =>
			service.time.postStartTimer({ subject, time, status }),
		onMutate: ({ subject, time, status }) => {
			handleStartTime(time!, subject, 0);
			useInfoToast('타이머가 시작됐습니다!');
		},
		onSuccess: (data, params) => {
			handleStartTime(params.time!, params.subject, data.id);
		},
		onError: (error) => {
			toast.error(`에러가 발생했습니다. 다시 시도해주세요`);
			handleEndTime();
		},
		onSettled: (data, err, params) => {
			queryClient.invalidateQueries([
				...QUERY_KEYS.getPersonalTimesByDate,
				params.time!.toDateString(),
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
		mutationFn: ({ timeId, time, status }: StopTimerRequest) =>
			service.time.fetchStopTimer({ timeId }),
		onMutate: ({ time, status }) => {
			handleEndTime();
			useInfoToast('타이머가 종료됐습니다!');
		},
		onSuccess: (data, params) => {},
		onError: (error, params) => {
			if (isAxiosError(error)) {
				const { response } = error;
				const { message, code } = response!.data as ExceptionRes;

				if (code) {
					if (code === ExceptionCode.TimeReset) {
						toast.error(`에러가 발생했습니다. 다시 시도해주세요`);
						handleEndTime();
					} else if (code === ExceptionCode.TimeContinue) {
						toast.error(`에러가 발생했습니다. 다시 시도해주세요`);
						const times = queryClient.getQueryData<Time[]>([
							...QUERY_KEYS.getPersonalTimesByDate,
							params.time!.toDateString(),
						]);
						if (times && times.length > 0) {
							const { startTime, subject, id } = times.at(-1)!;
							handleStartTime(formatBroswerTime(startTime), subject, id);
						}
					}
				}
			}
		},
		onSettled: (data, err, params) => {
			queryClient.invalidateQueries([
				...QUERY_KEYS.getPersonalTimesByDate,
				params.time!.toDateString(),
			]);
		},
	});

	return mutate;
}

/**
 * 시간 추가하는 hooks
 * @param closePopUp 팝업 닫는 함수
 * @returns
 */
export function usePostAddTimer(closePopUp: () => void) {
	const queryClient = useQueryClient();
	const mutate = useMutation({
		mutationFn: (req: Parameters<typeof service.time.postAddTimer>[0]) => {
			return service.time.postAddTimer(req);
		},
		onSuccess: (data, params) => {
			queryClient.invalidateQueries([
				...QUERY_KEYS.getPersonalTimesByDate,
				params.date.toDateString(),
			]);
			useInfoToast('시간이 추가됐습니다!');
		},
		onError: () => {
			toast.error('에러가 발생했습니다. 다시 시도해주세요');
		},
		onSettled: () => {
			closePopUp();
		},
	});

	return mutate;
}

export function useGetImmediateTimes(date: Date) {
	const queryClient = useQueryClient();

	const times = queryClient.getQueryData<Time[]>([
		...QUERY_KEYS.getPersonalTimesByDate,
		date.toDateString(),
	]);
	return times;
}

export function useDeleteTimes(cb: () => void) {
	const queryClient = useQueryClient();

	const mutate = useMutation({
		mutationFn: (req: Parameters<typeof service.time.deleteTimer>[0]) => {
			return service.time.deleteTimer(req);
		},
		onSuccess: (data, params) => {
			queryClient.invalidateQueries([...QUERY_KEYS.getPersonalTimesByDate]);
			useInfoToast('성공적으로 삭제됐습니다!');
		},
		onError: () => {
			toast.error('에러가 발생했습니다. 다시 시도해주세요');
		},
		onSettled: () => {
			cb();
		},
	});

	return mutate;
}
