import dbClient from '@/lib/db';

export async function findPlanPageByPlanPageId(id: number, userId: string) {
	const page = await dbClient.planPage.findFirstOrThrow({
		where: {
			id: Number(id),
			userId,
			is_deleted: false,
		},
		include: {
			plans: {
				where: {
					is_deleted: false,
				},
				orderBy: {
					startTime: 'asc',
				},
			},
		},
	});

	return page;
}

export async function findPlanPagesByUserId(userId: string) {
	const pages = await dbClient.planPage.findMany({
		where: {
			userId,
			is_deleted: false,
		},
	});

	return pages;
}

export async function deletePlanPageByPlanId(id: number, userId: string) {
	const page = await dbClient.planPage.update({
		where: {
			id: Number(id),
			userId: userId,
		},
		data: {
			is_deleted: true,
		},
	});

	return page;
}

export async function updatePlanPageByPlanId(
	id: number,
	name: string,
	userId: string
) {
	const page = await dbClient.planPage.update({
		where: {
			id: Number(id),
			userId,
		},
		data: {
			name,
		},
	});

	return page;
}

export async function createPlanPageByUserId(userId: string, name: string) {
	const page = await dbClient.planPage.create({
		data: {
			name,
			userId,
		},
		include: {
			plans: true,
		},
	});

	return page;
}

export async function createPlanByUserId({
	startTime,
	subject,
	userId,
	endTime,
	planPageId,
}: {
	startTime: Date;
	endTime: Date;
	userId: string;
	planPageId: number;
	subject: string;
}) {
	const res = await dbClient.plan.create({
		data: {
			startTime,
			endTime,
			plan_page_id: planPageId,
			user_id: userId,
			subject,
		},
	});

	return res;
}

export async function updatePlanByUserId({
	startTime,
	subject,
	userId,
	endTime,
	planId,
}: {
	startTime: Date;
	endTime: Date;
	userId: string;
	planId: number;
	subject: string;
}) {
	const res = await dbClient.plan.update({
		where: {
			id: planId,
			user_id: userId,
		},
		data: {
			startTime,
			endTime,
			subject,
		},
	});

	return res;
}

export async function deletePlanByPlanId(planId: number, userId: string) {
	const res = await dbClient.plan.update({
		where: {
			id: Number(planId),
			user_id: userId,
		},
		data: {
			is_deleted: true,
		},
	});

	return res;
}
