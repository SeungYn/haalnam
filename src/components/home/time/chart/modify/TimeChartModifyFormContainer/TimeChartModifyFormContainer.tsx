'use client';

import TimeChartModifyForm from '../TimeChartModifyForm/TimeChartModifyForm';
import { useSelectedDateStore } from '@/store/dateStore';
import { usePatchUptateTime } from '@/hooks/api/time';
import { Time } from '@prisma/client';
import { radianToAngle, stringTimeToRadian } from '@/utils/chart';

type Props = {
	closePopUp: () => void;
	selectedTime: Time;
	times: Time[];
};
export default function TimeChartModifyFormContainer({
	closePopUp,
	selectedTime,
	times,
}: Props) {
	const { selectedDate } = useSelectedDateStore();
	const mutateTime = usePatchUptateTime({ closePopup: closePopUp });

	const startRadian = stringTimeToRadian(String(selectedTime.startTime));
	const startDegree = radianToAngle(startRadian);
	const endRadian = stringTimeToRadian(String(selectedTime.endTime));
	const endDegree = radianToAngle(endRadian);

	return (
		<TimeChartModifyForm
			selectedTimeId={selectedTime.id}
			originTimes={times.filter((i) => i.id !== selectedTime.id)}
			mutateTime={mutateTime}
			originSubject={selectedTime.subject}
			startAngles={[startDegree, startRadian]}
			endAngles={[endDegree, endRadian]}
			currentDate={selectedDate}
		/>
	);
}
