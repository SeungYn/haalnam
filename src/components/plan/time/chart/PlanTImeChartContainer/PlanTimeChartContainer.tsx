'use client';

import { useSession } from 'next-auth/react';
import PlanTimeChart from '../PlanTimeChart/PlanTimeChart';
import { useSelectedPlanStore } from '@/store/SelectPlanStore';
import { useGetPlanPageWithSuspense } from '@/hooks/api/plan';

export default function PlanTimeChartContainer() {
	const { data } = useSession();
	const { selectedPlanId } = useSelectedPlanStore();
	const { data: planPage } = useGetPlanPageWithSuspense(
		selectedPlanId || data!.user.defaultMainPlanPageId
	);
	return <PlanTimeChart times={planPage!.plans} />;
}
