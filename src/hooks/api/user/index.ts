'use client';

import service from '@/service/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEYS } from './queryKey';
import { PostUserProfileRequest } from '@/service/types/user';
import { toast } from 'react-toastify';

export function useGetUserInfoSuspense(id: string) {
	return useQuery({
		queryKey: [...USER_QUERY_KEYS.getUserInfo],
		queryFn: () => service.user.getUserInfo(id),
		suspense: true,
	});
}

export function usePostUserProfile(successCb: () => void, failCb: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (req: PostUserProfileRequest) =>
			service.user.postUserProfile(req),
		onSuccess: () => {
			queryClient.invalidateQueries([...USER_QUERY_KEYS.getUserInfo]);
			toast.success('프로필이 변경됐습니다.');
			successCb();
		},
		onError: () => {
			toast.error('프로필이 실패했습니다. 다시 시도해주세요');
			failCb();
		},
	});
}
