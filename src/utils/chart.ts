export type ChartSize = 300 | 600 | 250;

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
	// const angle = radian * (180 / Math.PI);

	// const hours = Math.floor(angle / 15);
	// const minutes = Math.floor((angle % 15) / 0.25);
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
