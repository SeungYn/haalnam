'use client';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

type LineChartType = {
	data: { x: any; y: any }[];
};

const margin = {
	left: 100,
	right: 100,
	top: 100,
	bottom: 100,
};
const svgWidth = 1000,
	svgHeight = 500;

const tooltipWidth = 140,
	tooltipHeight = 50;

export default function LineChart({ data }: LineChartType) {
	const svgRef = useRef<SVGSVGElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(0);

	const innerWidth = svgWidth - margin.left - margin.right;
	const innerHeight = svgHeight - margin.top - margin.bottom;

	const xScale = d3
		.scaleTime()
		.domain([data[0].x, data.at(-1)!.x])
		.range([0, innerWidth]);
	const yScale = d3
		.scaleLinear()
		.domain(d3.extent(data, (d) => d.y as number) as [number, number])
		.range([innerHeight, 0]);
	const lineGenerator = d3
		.line<{ x: Date; y: number }>()
		.x((d) => xScale(d.x))
		.y((d) => yScale(d.y));

	const leftTicks = yScale.ticks(5);
	useEffect(() => {
		if (!svgRef.current) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
			} else setIsVisible(false);
		});

		observer.observe(svgRef.current);

		if (!isVisible) return;

		const svg = d3.select(svgRef.current);
		const path = svg.select('.linepath');
		const dashTotalLength = (path.node() as SVGPathElement).getTotalLength();

		path
			.attr('stroke-dasharray', dashTotalLength)
			.attr('stroke-dashoffset', dashTotalLength)
			.transition()
			.duration(2000)
			.attr('stroke-dashoffset', 0);

		return () => {
			if (svgRef.current) observer.unobserve(svgRef.current);
		};
	}, [isVisible]);

	return (
		<svg
			ref={svgRef}
			viewBox={`0, 0, ${svgWidth}, ${svgHeight}`}
			className={'relative text-gray-400'}
			onMouseLeave={() => setSelectedDataIndex(null)}
		>
			<g transform="translate(100, 100)">
				{/* left Axis */}
				<g className="stroke-gray-400 text-xl" transform={`translate(0, 0)`}>
					<line x1={0} x2={0} y1={0} y2={innerHeight} />
					{leftTicks.map((d) => {
						if (d === 0) return null;
						return (
							<g key={d} transform={`translate(0, ${yScale(d)})`}>
								<line x1={-8} x2={0} y1={0} y2={0}></line>
								<text
									x={-12}
									className="text-2xl"
									textAnchor="end"
									alignmentBaseline="middle"
									fill={'white'}
								>
									{d}
								</text>
								<line
									x1={0}
									x2={innerWidth}
									y1={0}
									y2={0}
									strokeDasharray={innerWidth / 100}
								></line>
							</g>
						);
					})}
					<text
						className="d3-tooltip"
						textAnchor="middle"
						transform={`translate(-50, ${innerHeight / 2}) `}
						fill={'white'}
					>
						<tspan x={0} dy={0}>
							시
						</tspan>
						<tspan x={0} dy="1.2em">
							간
						</tspan>
					</text>
				</g>
				{/* bottom Axis */}
				<g
					className="stroke-gray-400 text-xl"
					transform={`translate(0, ${innerHeight})`}
				>
					<line x1={0} x2={innerWidth} y1={0} y2={0} />
					{data.map((d) => (
						<g key={d.x} transform={`translate(${xScale(d.x)}, 0)`}>
							<line x1={0} x2={0} y1={0} y2={5}></line>
							<text
								y={20}
								className="d3-tooltip"
								textAnchor="middle"
								dominantBaseline="middle"
								fill={'white'}
							>
								{`${(d.x as Date).getMonth() + 1}/${(d.x as Date).getDate()}`}
							</text>
						</g>
					))}
					<text
						className="d3-tooltip"
						textAnchor="middle"
						transform={`translate( ${innerWidth / 2}, 60) `}
						fill={'white'}
					>
						요일
					</text>
				</g>
				{data.map((d) => (
					<circle
						key={d.x}
						r={5}
						fill={'white'}
						cx={xScale(d.x)}
						cy={yScale(d.y)}
					></circle>
				))}
				<path
					className="linepath"
					onMouseMove={(e) => {
						const pointerDate = xScale.invert(d3.pointer(e)[0]).getDate();
						const findIndex = data.findIndex(
							(d) => (d.x as Date).getDate() === pointerDate
						);

						setSelectedDataIndex(findIndex);
					}}
					d={lineGenerator(data)!}
					stroke={'white'}
					strokeWidth={3}
					fill={'none'}
				></path>

				{/* tooltip */}
				<g
					className=""
					transform={
						selectedDataIndex !== null
							? `translate(${xScale(data[selectedDataIndex].x) - 70} , ${yScale(data[selectedDataIndex].y) - 70})`
							: 'translate(0,0)'
					}
					opacity={selectedDataIndex !== null ? 100 : 0}
				>
					<rect
						width={tooltipWidth}
						height={tooltipHeight}
						rx={5}
						ry={5}
						fill="black"
					></rect>
					<text
						className="d3-tooltip"
						fill="white"
						dominantBaseline="middle"
						textAnchor="middle"
						transform="translate(70,25)"
					>
						{selectedDataIndex !== null
							? `${data[selectedDataIndex].y}시간`
							: ''}
					</text>
				</g>
			</g>
		</svg>
	);
}
