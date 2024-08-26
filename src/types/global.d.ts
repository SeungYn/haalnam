import { Plan, Time, User } from '@prisma/client';

export {};
declare global {
	type CustomPath2D = {
		path2D: Path2D;
		rgba: RGBA;
		colorPaletteIndex: number;
		startTimeObj: Time;
		endTimeObj: Time;
		startTime: Date | string;
		endTime: Date | string;
	};

	type CustomPlanPath2D = {
		path2D: Path2D;
		rgba: RGBA;
		colorPaletteIndex: number;
		plan: Plan;
	};

	type RGBA = {
		r: number;
		g: number;
		b: number;
		a: number;
	};

	type Calendar = {
		day: number;
		date: Date;
		accent: boolean;
	};

	/**
	 * Plan 관련 타입
	 */

	/**
	 * 유저 관련 타입들
	 */
	type UserInfo = Pick<
		User,
		'instagram' | 'nickname' | 'introduce' | 'id' | 'image' | 'is_public'
	> & {
		totalHours: number;
		todayHours: number;
	};

	type UserProfile = Pick<
		User,
		'instagram' | 'nickname' | 'introduce' | 'id' | 'image'
	>;

	/**
	 * 리액트 쿼리 관련 에러
	 */

	type ReactQueryError = {
		message: string;
		status: number;
	};
}
