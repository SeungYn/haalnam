import { Time } from '@prisma/client';

export type Size =
	| 'small'
	| 'medium'
	| 'large'
	| 'semi-medium'
	| ''
	| undefined;

export type TimeChartData = {
	time: Date;
	subject: string;
	type: string;
};
