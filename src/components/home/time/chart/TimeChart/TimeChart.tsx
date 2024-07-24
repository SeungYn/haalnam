'use client';

import {
	type ChartSize,
	makeChartGradutionTimeInfo,
	timeToDegree,
} from '@/utils/chart';
import {
	differenceTime,
	formatDisplayTime,
	toSecondsByMilliseconds,
} from '@/utils/date';
import { chartData } from '@/utils/mock/chart/data';
import { ROTATE_DEG } from '@/utils/size';
import { deepCopy } from '@/utils/util';
import { Time } from '@prisma/client';
import {
	MouseEvent,
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

const colorPalette = [
	{ r: 33, g: 255, b: 140, a: 100 },
	{ r: 33, g: 222, b: 255, a: 100 },
	{ r: 33, g: 255, b: 214, a: 100 },
	{ r: 33, g: 255, b: 63, a: 100 },
	{ r: 33, g: 151, b: 255, a: 100 },
];

function randomIndexInclusive(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function paletteRandomIndex(colorPalette: RGBA[]) {
	return randomIndexInclusive(0, colorPalette.length - 1);
}

/**
 * 이전 Path2D 색상과 겹치면 다시 랜덤 색상 뽑음
 */
function filterDuplicatePrevIndex(
	currentIndex: number,
	customPath2Ds: CustomPath2D[],
	colorPalette: RGBA[]
) {
	if (currentIndex === 0) return paletteRandomIndex(colorPalette);

	const currentColorPaletteIndex = paletteRandomIndex(colorPalette);
	const prevIndex = currentIndex - 1;

	// 현재 인덱스가 배열의 마지막 인덱스인경우
	// 0 번째 인덱스와 이전 인덱스에서 중복을 걸러내야함.
	if (currentIndex === customPath2Ds.length - 1) {
		const colorPaletteIndexOfZeroIndex = customPath2Ds[0].colorPaletteIndex;
		if (colorPaletteIndexOfZeroIndex === currentColorPaletteIndex)
			return filterDuplicatePrevIndex(
				currentIndex,
				customPath2Ds,
				colorPalette
			);
		if (customPath2Ds[prevIndex].colorPaletteIndex === currentColorPaletteIndex)
			return filterDuplicatePrevIndex(
				currentIndex,
				customPath2Ds,
				colorPalette
			);
	}
	///debugger;
	if (customPath2Ds[prevIndex].colorPaletteIndex !== currentColorPaletteIndex)
		return currentColorPaletteIndex;

	return filterDuplicatePrevIndex(currentIndex, customPath2Ds, colorPalette);
}

type Props = {
	times: Time[];
};

type HoverChartPiece = CustomPath2D & {
	x: number;
	y: number;
};

// 새로 적용할 color
// rgb(161, 161, 161)
// bg rgb(10, 10, 10)
export default function TimeChart({ times }: Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [chartWidth, setChartWidth] = useState<ChartSize>(300);
	const [path2Ds, setPath2Ds] = useState<CustomPath2D[]>([]);
	const [hoverCustomPath2D, setHoverCustomPath2D] =
		useState<HoverChartPiece | null>(null);

	const onClickCanvas = (e: MouseEvent) => {
		const { offsetY, offsetX, pageX, pageY } = e.nativeEvent;

		const ctx = canvasRef.current?.getContext('2d');

		if (ctx) {
			let hoveredObj: CustomPath2D | null = null;
			path2Ds.forEach((obj) => {
				const path2D = obj.path2D;
				const { r, g, b } = obj.rgba;
				if (ctx.isPointInPath(path2D, offsetX, offsetY)) {
					//const isInPath = ctx.isPointInPath(path2D, offsetX, offsetY);
					hoveredObj = obj;
					// 흰색 호를 그려서 투명색을 조정
					ctx.fillStyle = 'white';
					ctx.strokeStyle = 'white';
					ctx.fill(path2D);
					ctx.stroke(path2D);

					ctx.fillStyle = `rgb(${r}, ${g}, ${b}, 0.4)`;
					ctx.fill(path2D);
				} else {
					ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
					ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
					ctx.fill(path2D);
					ctx.stroke(path2D);
				}
			});

			if (hoveredObj !== null) {
				setHoverCustomPath2D((state) => {
					return {
						...deepCopy(hoveredObj as CustomPath2D),
						x: offsetX,
						y: offsetY,
					};
				});
			} else {
				setHoverCustomPath2D(null);
			}

			//drawChartMiddleCycle(ctx);
		}
	};

	const onMouseLeaveCanvase = (e: MouseEvent) => {
		const ctx = canvasRef.current?.getContext('2d');

		if (ctx) {
			path2Ds.forEach((obj) => {
				const path2D = obj.path2D;
				const { r, g, b } = obj.rgba;
				ctx.fillStyle = `rgb(${r}, ${g}, ${b})`; //채울 색상
				ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
				ctx.fill(path2D);
				ctx.stroke(path2D);
			});

			//drawChartMiddleCycle(ctx);
		}

		// hover된 객체 제거
		setHoverCustomPath2D(null);
	};

	const drawChartMiddleCycle = useCallback(
		(ctx: CanvasRenderingContext2D) => {
			// 차트 가운데 동그라미 그리기
			const startPoint = parseInt(String(chartWidth / 2));
			ctx.save();
			ctx.fillStyle = '#6b7280';
			ctx.arc(
				startPoint,
				startPoint,
				startPoint / 30,
				0,
				(Math.PI / 180) * 360
			);
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.fill();
			ctx.restore();
		},
		[chartWidth]
	);

	// 프롭이 바뀔 때마다 캔버스 초기화
	// useLayoutEffect(() => {
	// 	if (canvasRef.current) {
	// 		console.log('canvas clear');
	// 		canvasRef.current
	// 			.getContext('2d')
	// 			?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
	// 	}
	// }, [times]);

	useLayoutEffect(() => {
		const mediaQuery = window.matchMedia('screen and (min-width:640px)');
		const changeCB = () => {
			if (mediaQuery.matches) {
				setChartWidth(600);
			} else {
				setChartWidth(300);
			}
		};
		if (mediaQuery.matches) {
			setChartWidth(600);
		} else {
			setChartWidth(300);
		}
		mediaQuery.addEventListener('change', changeCB);

		return () => {
			mediaQuery.removeEventListener('change', changeCB);
		};
	}, []);

	useLayoutEffect(() => {
		if (!times) return;
		if (!canvasRef.current) return;

		// canvas 초기화
		canvasRef.current
			.getContext('2d')
			?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

		const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
		const startX = parseInt(String(chartWidth / 2));
		const customPath2dList: CustomPath2D[] = [];

		for (let i = 0, index = 0; i < times.length; i++) {
			if (i % 2 !== 0) continue;

			// 데이터가 홀수 이고 마지막이 시작으로 끝나는 경우 캔슬
			if (times.length % 2 && i === times.length - 1) continue;
			const path = new Path2D();
			// 랜덤으로 색상을 뽑아주는 인덱스
			// const paletteIndex = filterDuplicatePrevIndex(
			//   customPath2dList.length,
			//   customPath2dList,
			//   colorPalette
			// );

			// 색상을 규칙적을 뽑는 인덱스
			const paletteIndex = index % colorPalette.length;

			index++;
			ctx.beginPath();
			// ctx.lineWidth = 30;
			path.moveTo(startX, startX);
			path.arc(
				startX,
				startX,
				chartWidth / 2,
				+((Math.PI / 180) * timeToDegree(times[i].time)).toFixed(2),
				+((Math.PI / 180) * timeToDegree(times[i + 1].time)).toFixed(2)
			);

			ctx.fillStyle = `rgb(${colorPalette[paletteIndex].r}, ${colorPalette[paletteIndex].g}, ${colorPalette[paletteIndex].b})`; //채울 색상
			ctx.strokeStyle = `rgb(${colorPalette[paletteIndex].r}, ${colorPalette[paletteIndex].g}, ${colorPalette[paletteIndex].b})`; //채울 색상
			ctx.fill(path); //채우기
			ctx.stroke(path); //테두리
			path.closePath();
			customPath2dList.push({
				path2D: path,
				rgba: colorPalette[paletteIndex],
				colorPaletteIndex: paletteIndex,
				startTimeObj: times[i],
				endTimeObj: times[i + 1],
			});
		}
		//drawChartMiddleCycle(ctx);
		setPath2Ds(customPath2dList);
	}, [canvasRef, chartWidth, times]);

	return (
		<div className="relative p-10">
			{/* 눈금 별 시간 표시 */}
			{makeChartGradutionTimeInfo((chartWidth + 45) / 2).map((v) => {
				return (
					<div
						suppressHydrationWarning
						key={JSON.stringify(v)}
						className="absolute text-2xl"
						style={{
							transform: `translate(${v.x + chartWidth / 2}px, ${
								v.y + chartWidth / 2
							}px) translate(-50%, -50%)`,
						}}
					>
						{v.time}
					</div>
				);
			})}
			{/* hover 팝업 */}
			{hoverCustomPath2D && (
				<div
					className="absolute z-[60] rounded-lg border border-h_gray bg-h_black p-5 text-center text-white"
					style={{
						left: '10px',
						top: '10px',
						transform: `translate3d(calc(${hoverCustomPath2D.x}px + 2.5rem), calc(${hoverCustomPath2D.y}px + 2.5rem), 0)`,
					}}
				>
					<h2>{hoverCustomPath2D.startTimeObj.subject}</h2>
					<p>
						시작시간: {formatDisplayTime(hoverCustomPath2D.startTimeObj.time)}
					</p>
					<p>
						종료시간: {formatDisplayTime(hoverCustomPath2D.endTimeObj.time)}
					</p>
					<p>
						사용시간(분):{' '}
						{Math.floor(
							toSecondsByMilliseconds(
								differenceTime(
									hoverCustomPath2D.startTimeObj.time,
									hoverCustomPath2D.endTimeObj.time
								)
							)! / 60
						)}
					</p>
					<p>
						사용시간(초):{' '}
						{toSecondsByMilliseconds(
							differenceTime(
								hoverCustomPath2D.startTimeObj.time,
								hoverCustomPath2D.endTimeObj.time
							)
						)}
					</p>
				</div>
			)}

			<div className="relative h-[300px] w-[300px] overflow-hidden rounded-full outline outline-2 outline-h_gray sm:h-[600px] sm:w-[600px]">
				<canvas
					ref={canvasRef}
					width={chartWidth}
					height={chartWidth}
					className="absolute z-30 cursor-pointer"
					onClick={onClickCanvas}
					onMouseMove={onClickCanvas}
					onMouseLeave={onMouseLeaveCanvase}
				></canvas>
				{makeGradution(24)}
				{/* 중앙 동그라미 */}
				<div className="absolute left-1/2 top-1/2 z-50 h-[20px] w-[20px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-h_black sm:h-[30px] sm:w-[30px]"></div>
			</div>
		</div>
	);
}

function makeGradution(count: number) {
	const list: JSX.Element[] = [];

	for (let i = 0; i < count; i++) {
		const element = (
			<div
				key={i}
				className={`absolute h-[2px] w-full transform bg-h_gray ${
					ROTATE_DEG[i * 15]
				} top-[calc(50%-1px)]`}
			></div>
		);
		list.push(element);
	}

	return list;
}
