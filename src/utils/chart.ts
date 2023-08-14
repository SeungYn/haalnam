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

export const makeChartGradutionTimeInfo = (radius: number) => {
  return getChartDegrees.map((v, i) => ({
    ...getRotatedPosition(radius, v),
    time: String(i).length < 2 ? '0' + i + '시' : i + '시',
  }));
};
