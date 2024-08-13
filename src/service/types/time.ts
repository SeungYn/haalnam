import { Time } from '@prisma/client';

export type PostTimeRequest = Omit<Time, 'id' | 'userId'>;
export type PostTimeResponse = Time;

export type GetPersonalTodayTimeResponse = Time[];

export type PostAddTimerRequest = {
	subject: string;
	date: {
		y: number;
		m: number;
		d: number;
	};
	startTime: { hours: number; minutes: number; seconds: number };
	endTime: { hours: number; minutes: number; seconds: number };
};
