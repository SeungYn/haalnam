'use client';

import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import { usePostEndTime } from '@/hooks/api/time';
import service from '@/service/client';
import { useSession } from 'next-auth/react';
import { PropsWithChildren, useEffect } from 'react';

/**
 * 페이지를 새로고침하거나 나갈 시 진행중인 타이머 종료해주는 HOC
 * 사용자 요구에 따라 일단 뺌
 * @param param0
 * @returns
 */
export default function CheckUnloadHOC({ children }: PropsWithChildren) {
	const { data: session } = useSession();
	const { status, subject } = useTimeContext();
	const { handleEndTime, handleStartTime } = useTimeActionContext();
	const { mutate: mutateTimeEnd } = usePostEndTime({
		handleEndTime,
		handleStartTime,
	});

	useEffect(() => {
		if (!session) return;
		// 새로고침 했을 때 타이머가 시작되고 있는지 확인
		// 만약 타이머가 진행중이면 종료시킴
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			service.time.postCheckRestTimer();
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [status, session]);

	return children;
}
