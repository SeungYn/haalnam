import { interFont } from '@/fonts';
import { ChartColorPalette } from '@/utils/chart';
import { Time } from '@prisma/client';

type TimeChartLabelType = {
	times: Time[];
};
export default function TimeChartLabel({ times }: TimeChartLabelType) {
	return (
		<ul
			className={`flex gap-x-4 gap-y-2 ${interFont.className} flex-wrap justify-center`}
		>
			{times.map((time, i) => (
				<li key={time + String(i)} className="flex items-center">
					<span
						className="mr-2 inline-block h-5 w-5 rounded-full"
						style={{
							backgroundColor: ChartColorPalette[i % ChartColorPalette.length],
						}}
					></span>
					<span className="text-xl">{time.subject}</span>
				</li>
			))}
		</ul>
	);
}
