import * as planRepository from '@/repository/planRepository';
import * as userRepository from '@/repository/userRepository';
import { PatchPlanRequest, PostPlanRequest } from '../types/plan';
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

	updatePushScheduleToWebPushServer(res.plan_page_id!, req.userId);

	return res;
}

export async function updatePlan(req: PatchPlanRequest & { userId: string }) {
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

	const res = await planRepository.updatePlanByUserId({
		...req,
		startTime: utcStartTime,
		endTime: utcEndTime,
	});

	updatePushScheduleToWebPushServer(res.plan_page_id!, req.userId);

	return res;
}

export async function deletePlan(planId: number, userId: string) {
	const res = await planRepository.deletePlanByPlanId(planId, userId);

	updatePushScheduleToWebPushServer(res.plan_page_id!, userId);

	return res;
}

export async function getUserDefaultPlans() {
	const users = await userRepository.findUsersAllWithPlans();
	users.forEach((user) => {
		user.plans = user.plans.filter(
			(plan) => plan.plan_page_id === user.default_main_plan_page_id
		);
	});

	return users;
}

export async function getUserDefaultPlansByUserId(userId: string) {
	const user =
		await userRepository.findUsersAllWithPlansAndWebPushSebscriptionByUserId(
			userId
		);
	if (!user) return null;

	user.plans = user.plans.filter(
		(plan) => plan.plan_page_id === user.default_main_plan_page_id
	);

	return user;
}

/**
 *  계획에 변화가 있으면 푸시 서버로 업데이트 해주는 함수
 * @param userId
 */
export async function updatePushScheduleToWebPushServer(
	targetPlanPageId: number,
	userId: string
) {
	const user = await getUserDefaultPlansByUserId(userId);

	if (!user || !user.is_webpush_privilege) return;

	// 수정이 일어난 계획의 페이지가 유저의 디폴트 페이지라면 스케쥴 업데이트
	if (targetPlanPageId === user.default_main_plan_page_id) {
		fetch('http://localhost:4000/schedule', {
			method: 'post',
			body: JSON.stringify([user]),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
