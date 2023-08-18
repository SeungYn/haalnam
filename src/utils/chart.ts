export type ChartSize = 300 | 600;

export const getChartDegrees = (() => {
  return Array.from({ length: 24 }, (_, i) => i * 15);
})();

export const getRotatedPosition = (radius: number, degree: number) => {
  return {
    x: radius * Math.cos((degree * Math.PI) / 180),
    y: radius * Math.sin((degree * Math.PI) / 180),
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
export const timeToDegree = (time: string) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours * 15 + minutes * 0.25;
};