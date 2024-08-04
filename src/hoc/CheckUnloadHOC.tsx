'use client';

import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import { usePostEndTime } from '@/hooks/api/time';
import { Status } from '@prisma/client';
import { PropsWithChildren, useEffect } from 'react';

export default function CheckUnloadHOC({ children }: PropsWithChildren) {
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
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			// 현재 타이머가 끝난 상태라면 무시
			if (status === Status.END) return;
			onEndTime();
			return;
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [status]);

	return children;
}
