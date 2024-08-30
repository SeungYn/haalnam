'use client';

import { usePatchUptatePlan } from '@/hooks/api/plan';
import { Plan } from '@prisma/client';
import PlanTimeChartModifyForm from '../PlanTimeChartModifyForm/PlanTimeChartModifyForm';
import { radianToAngle, stringTimeToRadian } from '@/utils/chart';

type Props = {
	closePopUp: () => void;
	selectedPlan: Plan;
	plans: Plan[];
};

export default function PlanTimeChartModifyFormContainer({
	closePopUp,
	selectedPlan,
	plans,
}: Props) {
	const mutatePlan = usePatchUptatePlan({ closePopup: closePopUp });

	const startRadian = stringTimeToRadian(String(selectedPlan.startTime));
	const startDegree = radianToAngle(startRadian);
	const endRadian = stringTimeToRadian(String(selectedPlan.endTime));
	const endDegree = radianToAngle(endRadian);

	return (
		<PlanTimeChartModifyForm
			currentPlanPageId={selectedPlan.plan_page_id!}
			closePopUp={closePopUp}
			originTimes={plans.filter((i) => i.id !== selectedPlan.id)}
			mutatePlan={mutatePlan}
			originSubject={selectedPlan.subject}
			startAngles={[startDegree, startRadian]}
			endAngles={[endDegree, endRadian]}
			selectedPlanId={selectedPlan.id}
		/>
	);
}
