import { useSelectedPlanStore } from '@/store/SelectPlanStore';
import { useSession } from 'next-auth/react';

export default function useSelectedPlan() {
	const { data } = useSession();
	const { selectedPlanId, setSelectedPlanId } = useSelectedPlanStore();
	const id = selectedPlanId || data!.user.defaultMainPlanPageId;

	return {
		selectedPlanId: id,
		setSelectedPlanId,
	};
}
