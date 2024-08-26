import { Plan, PlanPage } from '@prisma/client';

export type PostPlanPageRequest = {
	name: string;
};

export type PatchPlanPageRequest = {
	name: string;
};

export type DeletePlanPageRequest = {
	id: number;
};

export type PostPlanRequest = {
	startTime: { hours: number; minutes: number; seconds: number };
	endTime: { hours: number; minutes: number; seconds: number };
	planPageId: number;
	subject: string;
};

export type PlanPageResponse = PlanPage & {
	plans: Plan[];
};
