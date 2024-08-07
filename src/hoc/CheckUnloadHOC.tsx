'use client';

import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import { usePostEndTime } from '@/hooks/api/time';
import service from '@/service/client';
import { Status } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { PropsWithChildren, useEffect } from 'react';

export default function CheckUnloadHOC({ children }: PropsWithChildren) {
	const { data: session } = useSession();
	const { status, subject } = useTimeContext();
	const { handleEndTime, handleStartTime } = useTimeActionContext();
	const { mutate: mutateTimeEnd } = usePostEndTime({
		handleEndTime,
		handleStartTime,
	});
	const onEndTime = () => {
		mutateTimeEnd({
			subject,
			status: Status.END,
			time: new Date(),
		});
	};

	useEffect(() => {
		if (!session) return;
		// 새로고침 했을 때 타이머가 시작되고 있는지 확인
		// 만약 타이머가 진행중이면 종료시킴
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			service.time.postCheckRestTimer();
			// if (status === Status.END) return;
			// onEndTime();
			return;
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [status, session]);

	return children;
}
