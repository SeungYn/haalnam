'use client';

import CommonPopUpHeader from '@/components/common/header/CommonPopUpHeader';
import DateBanner from '@/components/date/DateBanner';
import TimeChartAddForm from '@/components/home/time/chart/modify/TimeChartAddForm/TimeChartAddForm';
import TimeForm from '@/components/home/time/TimeForm.tsx/TimeForm';
import TimePopUp from '@/components/home/time/TimePopUp/TimePopUp';
import { useTimeActionContext, useTimeContext } from '@/context/TimeContext';
import {
	useGetImmediateTimes,
	useGetTimesByDate,
	useGetTimesByDateNotSuspense,
	usePostEndTime,
	usePostStartTime,
} from '@/hooks/api/time';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import { PostTimeRequest } from '@/service/types/time';
import { useSelectedDateStore } from '@/store/dateStore';
import { hoursMinutesSecondsToRadian, stringTimeToRadian } from '@/utils/chart';
import { isCurrentDay } from '@/utils/date';
import { Status, Time } from '@prisma/client';
import { toast } from 'react-toastify';

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
	const { data: times = [] } = useGetTimesByDateNotSuspense(selectedDate);
	const onStart = ({ subject, time, status }: PostTimeRequest) => {
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
		mutateTimeEnd({
			subject,
			status: Status.END,
			time: new Date(),
		});
	};

	/**
	 * 선택된 시간에 타이머가 진행했는지 확인해주는 함수
	 * @param times
	 * @returns
	 */
	const checkStartOverlappingTime = (times: Time[], currentRadian: number) => {
		for (let i = 0; i < times.length; i += 2) {
			const startTime = times[i].time;
			const endTime = times[i + 1].time;

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
