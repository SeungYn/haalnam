import { Time } from '@prisma/client';

export const TIME_MOCK_DATA: Time[] = [
	{
		id: 1,
		status: 'START',
		subject: '123',
		time: '2024-08-12T02:12:48.958Z' as unknown as Date,
		userId: 'clzgncc1l0000dhcrubvplrmn',
	},
	{
		id: 2,
		status: 'END',
		subject: '123',
		time: '2024-08-12T03:13:48.958Z' as unknown as Date,
		userId: 'clzgncc1l0000dhcrubvplrmn',
	},
	{
		id: 3,
		status: 'START',
		subject: '123',
		time: '2024-08-12T12:12:48.958Z' as unknown as Date,
		userId: 'clzgncc1l0000dhcrubvplrmn',
	},
	{
		id: 4,
		status: 'END',
		subject: '123',
		time: '2024-08-12T14:13:48.958Z' as unknown as Date,
		userId: 'clzgncc1l0000dhcrubvplrmn',
	},
	{
		id: 5,
		status: 'START',
		subject: '123',
		time: '2024-08-12T17:12:48.958Z' as unknown as Date,
		userId: 'clzgncc1l0000dhcrubvplrmn',
	},
	{
		id: 6,
		status: 'END',
		subject: '123',
		time: '2024-08-12T21:13:48.958Z' as unknown as Date,
		userId: 'clzgncc1l0000dhcrubvplrmn',
	},
];
