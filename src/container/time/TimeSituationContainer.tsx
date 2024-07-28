'use client';

import TimerSituation from '@/components/home/time/TimerSituation/TimerSituation';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import { usePostEndTime } from '@/hooks/api/time';
import useEnrollVisibilityChange from '@/hooks/common/useEnrollVisibilityChangeEvent';
import useForceUpdate from '@/hooks/common/useForceUpdate';
import { Status } from '@prisma/client';

export default function TimeSituationContainer() {
	const timeState = useTimeContext();
	const { handleEndTime } = useTimeActionContext();
	const { mutate } = usePostEndTime({ handleEndTime });
	const [id, forceUpdate] = useForceUpdate();

	const onEndTime = () => {
		mutate({
			subject: timeState.subject,
			status: Status.END,
			time: new Date(),
		});
	};

	// visibilityChange 이벤트 등록
	useEnrollVisibilityChange(forceUpdate);

	if (timeState.status === 'END') return <></>;

	return <TimerSituation key={id} {...timeState} onEndTime={onEndTime} />;
}
