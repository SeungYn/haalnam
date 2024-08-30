import { Status, Time } from '@prisma/client';

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

export type DeleteTimerRequest = {
	timeId: number;
};

export type StartTimerRequest = {
	subject: string;
	status: Status;
	time?: Date;
};

export type StopTimerRequest = {
	timeId: number;
	status: Status;
	time?: Date;
};

export type PatchTimeRequest = {
	startTime: { hours: number; minutes: number; seconds: number };
	endTime: { hours: number; minutes: number; seconds: number };
	date: {
		y: number;
		m: number;
		d: number;
	};
	timeId: number;
	subject: string;
};
