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

export type PatchDefaultPlanPageRequest = {
	planPageId: number;
};

export type PostPlanRequest = {
	startTime: { hours: number; minutes: number; seconds: number };
	endTime: { hours: number; minutes: number; seconds: number };
	planPageId: number;
	subject: string;
};

export type PatchPlanRequest = {
	startTime: { hours: number; minutes: number; seconds: number };
	endTime: { hours: number; minutes: number; seconds: number };
	planId: number;
	subject: string;
};

export type PlanPageResponse = PlanPage & {
	plans: Plan[];
};

export namespace PlanDTO {
	export type PatchDefaultPlanPageReq = PatchDefaultPlanPageRequest;
}
