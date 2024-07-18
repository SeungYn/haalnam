import { Time } from '@prisma/client';

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
}
