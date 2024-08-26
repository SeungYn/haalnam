'use client';

import { useSession } from 'next-auth/react';
import PlanTimeTable from '../PlanTimeTable/PlanTimeTable';
import { useSelectedPlanStore } from '@/store/SelectPlanStore';
import { useGetPlanPageWithSuspense } from '@/hooks/api/plan';

export default function PlanTimeTableContainer() {
	const { data } = useSession();
	const { selectedPlanId } = useSelectedPlanStore();
	const { data: planPage } = useGetPlanPageWithSuspense(
		selectedPlanId || data!.user.defaultMainPlanPageId
	);

	return <PlanTimeTable times={planPage!.plans} />;
}
