export type ChartSize = 300 | 600;

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

// 시간을 각도로 변환해주는 함수
export const timeToDegree = (time: Date) => {
	//const date = new Date(time);
	const date = String(time).split(/[T:]/);
	const hours = parseInt(date[1]);
	const minutes = parseInt(date[2]);

	return hours * 15 + minutes * 0.25;
};
