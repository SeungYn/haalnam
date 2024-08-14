'use client';

import CommonPopUpHeader from '@/components/common/header/CommonPopUpHeader';
import DateBanner from '@/components/date/DateBanner';
import TimeChartAddForm from '@/components/home/time/chart/modify/TimeChartAddForm/TimeChartAddForm';
import TimeForm from '@/components/home/time/TimeForm.tsx/TimeForm';
import TimePopUp from '@/components/home/time/TimePopUp/TimePopUp';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import { usePostEndTime, usePostStartTime } from '@/hooks/api/time';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
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
	const { isMounting, isOpen, setIsOpen, setIsMounting } = usePopUpStatus(300);

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
	return (
		<>
			<TimeForm
				onStart={onStart}
				onEndTime={onEndTime}
				onAddPopUpOpen={setIsOpen}
			/>
			<TimePopUp
				isMounting={isMounting}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				setIsMounting={setIsMounting}
			>
				<CommonPopUpHeader
					title={'시간 추가'}
					onEvent={() => setIsMounting(false)}
				/>
				<div>
					<TimeChartAddForm closePopUp={() => setIsMounting(false)} />
				</div>
			</TimePopUp>
		</>
	);
}
