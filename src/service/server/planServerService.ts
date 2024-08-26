import * as planRepository from '@/repository/planRepository';
import { PostPlanRequest } from '../types/plan';
import { makeUTCStringDate } from '@/utils/date';

export async function getPlanPageById(id: number, userId: string) {
	const page = await planRepository.findPlanPageByPlanPageId(id, userId);

	return page;
}

export async function getPlanPagesByUserId(userId: string) {
	const pages = await planRepository.findPlanPagesByUserId(userId);

	return pages;
}

export async function deletePlanPage(id: number, userId: string) {
	const page = await planRepository.deletePlanPageByPlanId(id, userId);

	return page;
}

export async function updatePlanPage(id: number, name: string, userId: string) {
	const page = await planRepository.updatePlanPageByPlanId(id, name, userId);

	return page;
}

export async function createPlanPage(userId: string, name: string) {
	const page = await planRepository.createPlanPageByUserId(userId, name);

	return page;
}

export async function createPlan(req: PostPlanRequest & { userId: string }) {
	const utcStartTime = makeUTCStringDate(
		2000,
		1,
		1,
		req.startTime.hours,
		req.startTime.minutes
	);
	const utcEndTime = makeUTCStringDate(
		2000,
		1,
		1,
		req.endTime.hours,
		req.endTime.minutes
	);

	const res = await planRepository.createPlanByUserId({
		...req,
		startTime: utcStartTime,
		endTime: utcEndTime,
	});

	return res;
}

export async function deletePlan(planId: number, userId: string) {
	const res = await planRepository.deletePlanByPlanId(planId, userId);

	return res;
}
