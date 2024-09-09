'use client';

import service from '@/service/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { QUERY_KEYS } from './queryKey';
import { useBasicLoadingStore } from '@/store/basicLoadingStore';
import { useSelectedPlanStore } from '@/store/SelectPlanStore';
import { useDialogContext } from '@/context/DialogContext';
import { InfoToast, useInfoToast } from '@/hooks/toast';
import { getAngleFromCoordinates, radianToTime } from '@/utils/chart';

/**
 * 계회 페이지들 가져오는 hook
 * @returns
 */
export function useGetPlanPagesWithSuspense() {
	const { data: session } = useSession();

	return useQuery({
		queryKey: ['planPages'],
		queryFn: () => service.plan.getPlanPages(),
		suspense: true,
		enabled: !!session,
	});
}

/**
 * 계획 페이지와 세부사황 가져오는 hook
 * @returns
 */
export function useGetPlanPageWithSuspense(pageId: number) {
	const { data: session } = useSession();

	return useQuery({
		queryKey: ['planPage', pageId],
		queryFn: () => service.plan.getPlanPage(pageId),
		suspense: true,
		enabled: !!session,
	});
}

/**
 * 계획 페이지 만드는 hook
 * @returns
 */
export function usePostCreatePlanPage() {
	const queryClient = useQueryClient();
	const { setLoading, reset } = useBasicLoadingStore();
	const { setSelectedPlanId } = useSelectedPlanStore();
	const { initDialog, reset: resetDialog } = useDialogContext();

	const mutation = useMutation({
		mutationFn: (planPageName: string) =>
			service.plan.postCreatePlanPage(planPageName),
		onMutate: () => {
			setLoading('계획 페이지를 생성 중입니다...');
		},
		onError: (error) => {
			toast.error('에러가 발생했습니다.');
			// initDialog({
			// 	title: '에러가 발생했습니다!',
			// 	body: '다시 시도해주세요!',
			// 	actionType: 'CONFIRM',
			// 	cancel: () => {},
			// 	confirm: () => {
			// 		resetDialog();
			// 	},
			// });
		},
		onSuccess: (data) => {
			setSelectedPlanId(data.id);
			queryClient.invalidateQueries([...QUERY_KEYS.planPages]);
		},
		onSettled: () => {
			reset();
		},
	});

	return mutation;
}

/**
 * 페이지 제목 변경 hook
 * @returns
 */
export function usePatchModifyPlanPage(
	successCb: (
		plan: Awaited<ReturnType<typeof service.plan.patchModifyPlanPage>>
	) => void
) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (req: { planPageId: number; name: string }) =>
			service.plan.patchModifyPlanPage(req),
		onError: () => {
			toast.error('에러가 발생했습니다.');
		},
		onSuccess: (data, req) => {
			successCb(data);
			queryClient.invalidateQueries([...QUERY_KEYS.planPages]);
			queryClient.invalidateQueries([...QUERY_KEYS.planPage, req.planPageId]);
		},
	});

	return mutation;
}

/**
 * 페이지 삭제 hook
 * @returns
 */
export function useDeletePlanPage() {
	const queryClient = useQueryClient();
	const { data: user } = useSession();
	const { setLoading, reset } = useBasicLoadingStore();
	const { setSelectedPlanId } = useSelectedPlanStore();

	const mutation = useMutation({
		mutationFn: (planPageId: number) => service.plan.deletePlanPage(planPageId),
		onMutate: () => {
			setLoading('페이지를 삭제 중입니다...');
		},
		onError: () => {
			toast.error('에러가 발생했습니다. 다시 시도해주세요');
		},
		onSuccess: (data, planPageId) => {
			queryClient.invalidateQueries([...QUERY_KEYS.planPages]);
			setSelectedPlanId(user!.user.defaultMainPlanPageId);
		},
		onSettled: () => {
			reset();
		},
	});

	return mutation;
}

/**
 * 계획 추가 hook
 * @returns
 */
export function usePostCreatePlan({ closePopup }: { closePopup: () => void }) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (req: Parameters<typeof service.plan.postPlan>[0]) =>
			service.plan.postPlan(req),
		onSuccess: (data, req) => {
			queryClient.invalidateQueries([...QUERY_KEYS.planPage, req.planPageId]);
			// eslint-disable-next-line
			useInfoToast('계획이 추가됐습니다!');
		},
		onError: () => {
			toast.error('에러가 발생했습니다. 다시 시도해주세요');
		},
		onSettled: () => {
			closePopup();
		},
	});

	return mutation;
}

/**
 * 계획 수정 hook
 * @returns
 */
export function usePatchUptatePlan({ closePopup }: { closePopup: () => void }) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (
			req: Omit<
				Parameters<typeof service.plan.patchUpdatePlan>[0],
				'startTime' | 'endTime'
			> & {
				startTimeAngles: ReturnType<typeof getAngleFromCoordinates>;
				endTimeAngles: ReturnType<typeof getAngleFromCoordinates>;
				planPageId: number;
			}
		) => {
			const { startTimeAngles, subject, planPageId, planId, endTimeAngles } =
				req;
			const startTime = radianToTime(startTimeAngles[1]);
			const endTime = radianToTime(endTimeAngles[1]);

			return service.plan.patchUpdatePlan({
				subject,
				planId,
				endTime,
				startTime,
			});
		},
		onSuccess: (data, req) => {
			queryClient.invalidateQueries([...QUERY_KEYS.planPage, req.planPageId]);
			toast(<InfoToast msg="계획이 수정됐습니다" />);
		},
		onError: () => {
			toast.error('에러가 발생했습니다. 다시 시도해주세요');
		},
		onSettled: () => {
			closePopup();
		},
	});

	return mutation;
}

/**
 * 계획 삭제 hook
 * @returns
 */
export function useDeletePlan(cb: () => void) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({
			planPageId,
			planTimeId,
		}: {
			planTimeId: number;
			planPageId: number;
		}) => service.plan.deletePlan(planTimeId),
		onSuccess: (data, req) => {
			queryClient.invalidateQueries(['planPage', req.planPageId]);
			// eslint-disable-next-line
			useInfoToast('성공적으로 삭제됐습니다!');
		},
		onError: () => {
			toast.error('에러가 발생했습니다. 다시 시도해주세요');
		},
		onSettled: () => {
			cb();
		},
	});

	return mutation;
}

/**
 * 기본 계획 페이지 바꿔주는 hook
 * @returns
 */
export function usePatchDefaultPlanPage(cb: (planPageId: number) => void) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({ planPageId }: { planPageId: number }) =>
			service.user.patchDefaultPlanPage(planPageId),
		onSuccess: (data, req) => {
			queryClient.invalidateQueries(['planPage', req.planPageId]);
			// eslint-disable-next-line
			useInfoToast('지정된 페이지로 알림을 보내드릴게요!');
			cb(req.planPageId);
		},
		onError: () => {
			toast.error('에러가 발생했습니다. 다시 시도해주세요');
		},
		onSettled: () => {},
	});

	return mutation;
}
