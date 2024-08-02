'use client';

import service from '@/service/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEYS } from './queryKey';
import { PostUserProfileRequest } from '@/service/types/user';

export function useGetUserInfoSuspense(id: string) {
	return useQuery({
		queryKey: [...USER_QUERY_KEYS.getUserInfo],
		queryFn: () => service.user.getUserInfo(id),
		suspense: true,
	});
}

export function usePostUserProfile(successCb: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (req: PostUserProfileRequest) =>
			service.user.postUserProfile(req),
		onSuccess: () => {
			queryClient.invalidateQueries([...USER_QUERY_KEYS.getUserInfo]);
			successCb();
		},
	});
}
