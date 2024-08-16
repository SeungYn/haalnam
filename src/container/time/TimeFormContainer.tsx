'use client';

import CommonPopUpHeader from '@/components/common/header/CommonPopUpHeader';
import DateBanner from '@/components/date/DateBanner';
import TimeChartAddForm from '@/components/home/time/chart/modify/TimeChartAddForm/TimeChartAddForm';
import TimeForm from '@/components/home/time/TimeForm.tsx/TimeForm';
import TimePopUp from '@/components/home/time/TimePopUp/TimePopUp';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import {
	useGetTimesByDateNotSuspense,
	usePostEndTime,
	usePostStartTime,
} from '@/hooks/api/time';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import { StartTimerRequest } from '@/service/types/time';
import { useSelectedDateStore } from '@/store/dateStore';
import { hoursMinutesSecondsToRadian, stringTimeToRadian } from '@/utils/chart';
import { isCurrentDay } from '@/utils/date';
import { Time } from '@prisma/client';
import { toast } from 'react-toastify';

export default function TimeFormContainer() {
	const { status, subject, timeId } = useTimeContext();
	const { handleStartTime, handleEndTime } = useTimeActionContext();
	const { mutate } = usePostStartTime({ handleStartTime, handleEndTime });
	const { mutate: mutateTimeEnd } = usePostEndTime({
		handleStartTime,
		handleEndTime,
	});
	const { selectedDate } = useSelectedDateStore();
	const { isMounting, isOpen, setIsOpen, setIsMounting } = usePopUpStatus(300);
	const { data: times = [] } = useGetTimesByDateNotSuspense(selectedDate);
	const onStart = ({ subject, time, status }: StartTimerRequest) => {
		const currentTime = new Date();

		const res = checkStartOverlappingTime(
			times,
			hoursMinutesSecondsToRadian(
				currentTime.getHours(),
				currentTime.getMinutes(),
				currentTime.getSeconds()
			)
		);

		if (res) {
			toast.error('현재 시간에 진행된 타이머가 존재합니다.');
			return;
		}

		mutate({ subject, time, status });
	};

	const onEndTime = () => {
		if (timeId) {
			mutateTimeEnd({
				timeId,
				status,
			});
		}
	};

	/**
	 * 선택된 시간에 타이머가 진행했는지 확인해주는 함수
	 * @param times
	 * @returns
	 */
	const checkStartOverlappingTime = (times: Time[], currentRadian: number) => {
		for (let i = 0; i < times.length; i++) {
			const startTime = times[i].startTime;
			const endTime = times[i].endTime;

			const startTimeRaian = stringTimeToRadian(String(startTime));
			const endTimeRaian = stringTimeToRadian(String(endTime));

			if (startTimeRaian <= currentRadian && currentRadian <= endTimeRaian) {
				return startTimeRaian;
			}
		}

		return null;
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
