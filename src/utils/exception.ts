import { NextResponse } from 'next/server';

export class CustomException extends Error {
	message;
	code?: number;
	constructor(message: string, code?: number) {
		super(message);
		this.message = message;
		this.code = code;
	}
}

export class ExceptionRes {
	message;
	code?: number;
	constructor(message: string, code?: number) {
		this.message = message;
		this.code = code;
	}
}

export const ExceptionCode = {
	TimeReset: 0,
	TimeContinue: 1,
} as const;

type ErrorConfig = {
	status: number;
	message: string;
};

export enum ErrorCode {
	BadRequest = '',
}

export function handleError(e: any) {
	console.error(e);
	if (e instanceof CustomException) {
		return NextResponse.json(new ExceptionRes(e.message), { status: 400 });
	}

	return NextResponse.json(new ExceptionRes('에러가 발생했습니다'), {
		status: 500,
	});
}
