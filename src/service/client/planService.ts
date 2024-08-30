import { AxiosInstance } from 'axios';
import {
	PatchPlanRequest,
	PlanPageResponse,
	PostPlanRequest,
} from '../types/plan';
import { Plan, PlanPage } from '@prisma/client';

export default class PlanService {
	constructor(private axios: AxiosInstance) {}

	async postPlan(req: PostPlanRequest) {
		const { data } = await this.axios.post<Plan>('/api/plan/time', { ...req });

		return data;
	}

	async patchUpdatePlan(req: PatchPlanRequest) {
		const url = `/api/plan/time/${req.planId}`;

		const { data } = await this.axios.patch<Plan>(url, { ...req });

		return data;
	}

	async deletePlan(planTimeId: number) {
		const { data } = await this.axios.delete<Plan>(
			'/api/plan/time/' + planTimeId
		);

		return data;
	}

	async getPlanPages() {
		const { data } = await this.axios.get<PlanPage[]>('/api/plan/page');

		return data;
	}

	async getPlanPage(planPageId: number) {
		const { data } = await this.axios.get<PlanPageResponse>(
			'/api/plan/page/' + planPageId
		);

		return data;
	}

	async postCreatePlanPage(name: string) {
		const { data } = await this.axios.post<PlanPageResponse>('/api/plan/page', {
			name,
		});

		return data;
	}

	async patchModifyPlanPage({
		planPageId,
		name,
	}: {
		planPageId: number;
		name: string;
	}) {
		const { data } = await this.axios.patch<PlanPageResponse>(
			'/api/plan/page/' + planPageId,
			{
				name,
			}
		);

		return data;
	}

	async deletePlanPage(planPageId: number) {
		const { data } = await this.axios.delete<PlanPageResponse[]>(
			'/api/plan/page/' + planPageId
		);

		return data;
	}
}
