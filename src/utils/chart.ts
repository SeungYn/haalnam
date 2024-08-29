// chartCssSizeType
export type ChartSize = 300 | 600 | 250;
export const ChartCanvasPixelSize = 1500;

export const ChartColorPalette = [
	'hsla(0, 100%, 80%, 1)',
	'hsla(30, 100%, 80%, 1)',
	'hsla(60, 100%, 80%, 1)',
	'hsla(90, 100%, 80%, 1)',
	'hsla(120, 100%, 80%, 1)',
	'hsla(150, 100%, 80%, 1)',
	'hsla(180, 100%, 80%, 1)',
	'hsla(210, 100%, 80%, 1)',
	'hsla(240, 100%, 80%, 1)',
	'hsla(270, 100%, 80%, 1)',
	'hsla(300, 100%, 80%, 1)',
];

export const ChartAccentColorPalette = [
	'hsla(0, 100%, 90%, 1)',
	'hsla(30, 100%, 90%, 1)',
	'hsla(60, 100%, 90%, 1)',
	'hsla(90, 100%, 90%, 1)',
	'hsla(120, 100%, 90%, 1)',
	'hsla(150, 100%, 90%, 1)',
	'hsla(180, 100%, 90%, 1)',
	'hsla(210, 100%, 90%, 1)',
	'hsla(240, 100%, 90%, 1)',
	'hsla(270, 100%, 90%, 1)',
	'hsla(300, 100%, 90%, 1)',
];

export const getChartDegrees = (() => {
	return Array.from({ length: 24 }, (_, i) => i * 15);
})();

/**
 * 반지름과 각도로 x,y 좌표 반환하는 함수
 * 12시 방향부터 시작하기 위해 -90도를 더함
 * @param radius
 * @param degree
 * @returns
 */
export const getRotatedPosition = (radius: number, degree: number) => {
	return {
		x: radius * Math.cos(((degree - 90) * Math.PI) / 180),
		y: radius * Math.sin(((degree - 90) * Math.PI) / 180),
	};
};

// 차트 눈금의 시간을 나타내는 배열
export const makeChartGradutionTimeInfo = (radius: number) => {
	return getChartDegrees.map((v, i) => ({
		...getRotatedPosition(radius, v),
		time: String(i).length < 2 ? '0' + i + '시' : i + '시',
	}));
};

// 문자열 시간을  각도로 변환해주는 함수
export const timeToDegree = (time: Date) => {
	//const date = new Date(time);
	const date = String(time).split(/[T:]/);
	const hours = parseInt(date[1]);
	const minutes = parseInt(date[2]);

	return hours * 15 + minutes * 0.25;
};

/**
 * 마우스 좌표로부터 각도와 라디안을 반환하는 함수
 * @param x 마우스 x
 * @param y 마우스 y
 * @param cx 원 중심 x
 * @param cy 원 중심 y
 * @returns
 */
export function getAngleFromCoordinates(
	x: number,
	y: number,
	cx: number,
	cy: number
): [number, number] {
	// x와 y를 중심 좌표에 대해 상대적으로 변환

	const dx = x - cx;
	const dy = -(y - cy); // y좌표 대칭 시킴 원점을 기준으로 위쪽은 양수 아래쪽은 음수로 나타내기 위해

	// 각도 계산 (라디안)
	let radians = Math.atan2(dx, dy); // 12시 방향을 기준으로 하기 위해 dy를 음수로 설정하고 x,y 좌표를 반전시킴
	if (radians < 0) {
		radians += 2 * Math.PI;
	}

	// 라디안을 도(degree)로 변환
	let angle = Math.round(radians * (180 / Math.PI));
	// console.log(angle);

	// 각도를 0~360도로 변환
	// if (angle < 0) {
	// 	angle += 360;
	// }
	//console.log('angle:: ', angle, 'radians:: ', radians);
	return [angle, radians];
}
/**
 * 각도를 시간으로 변환해주는 함수
 * @param angle
 */
export const angleToTime = (angle: number) => {
	const hours = Math.floor(angle / 15);
	const minutes = Math.floor((angle % 15) / 0.25);
	return `${hours}시 ${minutes}분`;
};

export const radianToAngle = (radian: number) => {
	return radian * (180 / Math.PI);
};

/**
 * 라디안을 시간으로 변환해주는 함수
 * @param angle
 *
 */
export const radianToTime = (radian: number) => {
	const hours = Math.floor((radian * 12) / Math.PI);
	const minutes = Math.floor(((radian * 12 * 60) / Math.PI) % 60);
	const seconds = Math.floor(((radian * 12 * 60 * 60) / Math.PI) % 60);
	return {
		hours,
		minutes,
		seconds,
		str: `${hours.toString().padStart(2, '0')}시 ${minutes.toString().padStart(2, '0')}분`,
	};
};

export const radianToBroswerDate = (radian: number) => {
	const hours = Math.floor((radian * 12) / Math.PI);
	const minutes = Math.floor(((radian * 12 * 60) / Math.PI) % 60);
	const seconds = Math.floor(((radian * 12 * 60 * 60) / Math.PI) % 60);

	const date = new Date();
	date.setHours(hours);
	date.setMinutes(minutes);
	date.setSeconds(seconds);

	return date;
};

/**
 * 2024-08-12T02:12:48.958Z 이런 시간 문자열을
 * 라디안으로 반환하는 함수
 * @param time
 */
export const stringTimeToRadian = (time: string) => {
	const filterTime = time.split('T')[1].replace('Z', '');
	const [hours, minutes, seconds] = filterTime.split(':').map(Number);
	const hoursRadian = hours * (Math.PI / 12);
	const minutesRadian = (minutes * Math.PI) / (12 * 60);
	const secondsRadian = (seconds * Math.PI) / (12 * 60 * 60);

	return hoursRadian + minutesRadian + secondsRadian;
};

export const hoursMinutesSecondsToRadian = (
	h: number,
	m: number,
	s: number
) => {
	const hoursRadian = h * (Math.PI / 12);
	const minutesRadian = (m * Math.PI) / (12 * 60);
	const secondsRadian = (s * Math.PI) / (12 * 60 * 60);

	return hoursRadian + minutesRadian + secondsRadian;
};
