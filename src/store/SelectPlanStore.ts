'use client';

import { PlanPage } from '@prisma/client';

import { create } from 'zustand';

interface SelectPlan {
	selectedPlan: PlanPage | null;
	selectedPlanId: number | null;
	setSelectedPlan: (plan: PlanPage) => void;
	setSelectedPlanId: (id: number) => void;
}

export const useSelectedPlanStore = create<SelectPlan>()((set) => {
	return {
		selectedPlan: null,
		selectedPlanId: null,
		setSelectedPlan: (plan) => set({ selectedPlan: plan }),
		setSelectedPlanId: (id) => set({ selectedPlanId: id }),
	};
});
