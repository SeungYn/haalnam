'use client';

import DateBanner from '@/components/date/DateBanner';
import TimeForm from '@/components/home/time/TimeForm.tsx/TimeForm';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import { usePostEndTime, usePostStartTime } from '@/hooks/api/time';
import { PostTimeRequest } from '@/service/types/time';
import { useSelectedDateStore } from '@/store/dateStore';
import { isCurrentDay } from '@/utils/date';
import { Status } from '@prisma/client';

export default function TimeFormContainer() {
	const { status, subject } = useTimeContext();
	const { handleStartTime, handleEndTime } = useTimeActionContext();
	const { mutate } = usePostStartTime({ handleStartTime, handleEndTime });
	const { mutate: mutateTimeEnd } = usePostEndTime({
		handleStartTime,
		handleEndTime,
	});
	const { selectedDate } = useSelectedDateStore();

	const onStart = ({ subject, time, status }: PostTimeRequest) => {
		mutate({ subject, time, status });
	};

	const onEndTime = () => {
		mutateTimeEnd({
			subject,
			status: Status.END,
			time: new Date(),
		});
	};

	if (status === 'START') return <></>;

	if (!isCurrentDay(selectedDate)) return <DateBanner time={selectedDate} />;
	return <TimeForm onStart={onStart} onEndTime={onEndTime} />;
}
