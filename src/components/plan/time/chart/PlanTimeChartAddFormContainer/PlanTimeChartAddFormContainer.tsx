import PlanTimeChartAddForm from '../PlanTimeChartAddForm/PlanTimeChartAddForm';
import {
	useGetPlanPageWithSuspense,
	usePostCreatePlan,
} from '@/hooks/api/plan';
import useSelectedPlan from '@/hooks/plan/useSelectedPlan';
import { PostPlanRequest } from '@/service/types/plan';

type Props = {
	closePopUp: () => void;
};

export default function PlanTimeChartAddFormContainer({ closePopUp }: Props) {
	const { selectedPlanId } = useSelectedPlan();
	const { data: times } = useGetPlanPageWithSuspense(selectedPlanId);
	const { mutate: addPlanTime } = usePostCreatePlan({ closePopup: closePopUp });
	const onAddPlanTime = (
		(selectedPlanId: number) =>
		({ subject, startTime, endTime }: Omit<PostPlanRequest, 'planPageId'>) => {
			addPlanTime({ planPageId: selectedPlanId, startTime, subject, endTime });
		}
	)(selectedPlanId);

	return (
		<PlanTimeChartAddForm
			closePopUp={closePopUp}
			times={times!.plans}
			addPlanTime={onAddPlanTime}
		/>
	);
}
