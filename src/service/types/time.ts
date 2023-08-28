import { Time } from '@prisma/client';

export type PostTimeRequest = Omit<Time, 'id' | 'userId'>;
export type PostTimeResponse = Time;

export type GetPersonalTodayTimeResponse = Time[];
