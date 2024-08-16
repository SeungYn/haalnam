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
