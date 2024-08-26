import { Plan, PlanPage } from '@prisma/client';

export const planMock: PlanPage[] = [
	{
		id: 0,
		name: '1페이지',
		userId: '12',
		created_at: new Date(),
		updated_at: new Date(),
		is_deleted: false,
	},
	{
		id: 1,
		name: '2페이지',
		userId: '12',
		created_at: new Date(),
		updated_at: new Date(),
		is_deleted: false,
	},
	{
		id: 2,
		name: '3페이지',
		userId: '12',
		created_at: new Date(),
		updated_at: new Date(),
		is_deleted: false,
	},
];

export const PLAN_MOCK_DATA: Plan[] = [
	{
		id: 1,
		subject: '123',
		startTime: '2024-08-12T02:12:48.958Z' as unknown as Date,
		endTime: '2024-08-12T04:12:48.958Z' as unknown as Date,
		user_id: '1',
		plan_page_id: 1,
		is_deleted: false,
	},

	{
		id: 2,
		subject: '222',
		startTime: '2024-08-12T06:12:48.958Z' as unknown as Date,
		endTime: '2024-08-12T08:12:48.958Z' as unknown as Date,
		plan_page_id: 1,
		user_id: '1',
		is_deleted: false,
	},
];
