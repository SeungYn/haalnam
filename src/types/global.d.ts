import { Time, User } from '@prisma/client';

export {};
declare global {
	type CustomPath2D = {
		path2D: Path2D;
		rgba: RGBA;
		colorPaletteIndex: number;
		startTimeObj: Time;
		endTimeObj: Time;
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
}
