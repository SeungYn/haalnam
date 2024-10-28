'use client';

import {
	ChartAccentColorPalette,
	ChartCanvasPixelSize,
	ChartColorPalette,
	type ChartSize,
	makeChartGradutionTimeInfo,
	timeToDegree,
} from '@/utils/chart';
import {
	differenceTime,
	formatDisplayTime,
	toSecondsByMilliseconds,
} from '@/utils/date';
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

type Props = {
	times: Time[];
	mode?: 'Normal' | 'Add';
};

type HoverChartPiece = CustomPath2D & {
	x: number;
	y: number;
};

// 새로 적용할 color
// rgb(161, 161, 161)
// bg rgb(10, 10, 10)
export default function TimeChart({ times, mode = 'Normal' }: Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [chartWidth, setChartWidth] = useState<ChartSize>(300);
	const [path2Ds, setPath2Ds] = useState<CustomPath2D[]>([]);
	const [hoverCustomPath2D, setHoverCustomPath2D] =
		useState<HoverChartPiece | null>(null);
	const chartSizeRatio = ChartCanvasPixelSize / chartWidth;

	const onClickCanvas = (e: MouseEvent) => {
		const { offsetY, offsetX, pageX, pageY } = e.nativeEvent;

		const ctx = canvasRef.current?.getContext('2d');

		if (ctx) {
			let hoveredObj: CustomPath2D | null = null;
			path2Ds.forEach((obj) => {
				const path2D = obj.path2D;

				const colorIndex = obj.colorPaletteIndex;
				if (
					ctx.isPointInPath(
						path2D,
						offsetX * chartSizeRatio,
						offsetY * chartSizeRatio
					)
				) {
					//const isInPath = ctx.isPointInPath(path2D, offsetX, offsetY);
					hoveredObj = obj;
					// 흰색 호를 그려서 투명색을 조정
					ctx.fillStyle = 'white';
					ctx.strokeStyle = 'white';
					ctx.fill(path2D);
					ctx.stroke(path2D);

					ctx.fillStyle = ChartAccentColorPalette[colorIndex];
					ctx.fill(path2D);
				} else {
					ctx.fillStyle = ChartColorPalette[colorIndex];
					ctx.strokeStyle = ChartColorPalette[colorIndex];
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

				const colorIndex = obj.colorPaletteIndex;
				ctx.fillStyle = ChartColorPalette[colorIndex];
				ctx.strokeStyle = ChartColorPalette[colorIndex];
				ctx.fill(path2D);
				ctx.stroke(path2D);
			});

			//drawChartMiddleCycle(ctx);
		}

		// hover된 객체 제거
		setHoverCustomPath2D(null);
	};

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
		const mbileMediaQuery = window.matchMedia('screen and (min-width:390px)');
		const changeCB = () => {
			if (mediaQuery.matches) {
				setChartWidth(600);
			} else {
				if (mbileMediaQuery.matches) {
					setChartWidth(300);
				} else {
					setChartWidth(250);
				}
			}
		};
		changeCB();
		mediaQuery.addEventListener('change', changeCB);
		mbileMediaQuery.addEventListener('change', changeCB);

		return () => {
			mediaQuery.removeEventListener('change', changeCB);
			mbileMediaQuery.removeEventListener('change', changeCB);
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
		const startX = ChartCanvasPixelSize / 2;
		const customPath2dList: CustomPath2D[] = [];

		for (let i = 0, index = 0; i < times.length; i++) {
			// timer가 진행중이면 cancel
			if (!times[i].endTime) continue;

			const path = new Path2D();
			const currentTime = times[i];

			// 색상을 규칙적을 뽑는 인덱스
			const paletteIndex = index % ChartColorPalette.length;

			index++;
			ctx.beginPath();
			// ctx.lineWidth = 30;
			path.moveTo(startX, startX);
			// 시작을 12시 방향부터 시작하기위해 -90를 회전시킴 그 코드는 - Math.PI / 2를 추가
			path.arc(
				startX,
				startX,
				startX,
				+((Math.PI / 180) * timeToDegree(currentTime.startTime)).toFixed(2) -
					Math.PI / 2,
				+((Math.PI / 180) * timeToDegree(currentTime.endTime!)).toFixed(2) -
					Math.PI / 2
			);

			ctx.fillStyle = ChartColorPalette[paletteIndex];
			ctx.strokeStyle = ChartColorPalette[paletteIndex];
			ctx.fill(path); //채우기
			ctx.stroke(path); //테두리
			path.closePath();
			customPath2dList.push({
				path2D: path,
				rgba: { r: 33, g: 255, b: 140, a: 100 }, // 제거 될 속성
				colorPaletteIndex: paletteIndex,
				startTimeObj: currentTime,
				startTime: currentTime.startTime,
				endTimeObj: currentTime,
				endTime: currentTime.endTime!,
			});
		}

		setPath2Ds(customPath2dList);
	}, [canvasRef, chartWidth, times]);

	return (
		<div className="relative my-10">
			{/* 눈금 별 시간 표시 */}
			{mode === 'Normal' &&
				makeChartGradutionTimeInfo((chartWidth + 45) / 2).map((v) => {
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

			<div
				className="relative h-[250px] w-[250px] overflow-hidden rounded-full outline outline-2 outline-h_gray"
				style={{ width: chartWidth, height: chartWidth }}
			>
				<canvas
					ref={canvasRef}
					width={ChartCanvasPixelSize}
					height={ChartCanvasPixelSize}
					style={{ width: chartWidth, height: chartWidth }}
					className="absolute z-30"
					onClick={onClickCanvas}
					onMouseMove={onClickCanvas}
					onMouseLeave={onMouseLeaveCanvase}
				></canvas>

				{makeGradution(24)}
				{/* 중앙 동그라미 */}
				<div className="absolute left-1/2 top-1/2 z-50 h-[20px] w-[20px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-h_black sm:h-[30px] sm:w-[30px]"></div>
			</div>

			{/* hover 팝업 */}
			{hoverCustomPath2D && (
				<div
					className="absolute z-[60] rounded-lg border border-h_gray bg-h_black p-5 text-center text-white"
					style={{
						left: '10px',
						top: '10px',
						// calc(${hoverCustomPath2D.x}px , 2.5rem) rem이 추가 된 것은 차트를 감싸는 요소가 패딩이 들어있기 때문 패딩 값까지 계산해서 hover를 띄어줌
						transform: `translate3d(calc(${hoverCustomPath2D.x}px ), calc(${hoverCustomPath2D.y}px ), 0)`,
					}}
				>
					<h2>{hoverCustomPath2D.startTimeObj.subject}</h2>
					<p>시작시간: {formatDisplayTime(hoverCustomPath2D.startTime)}</p>
					<p>종료시간: {formatDisplayTime(hoverCustomPath2D.endTime)}</p>
					<p>
						사용시간(분):{' '}
						{Math.floor(
							toSecondsByMilliseconds(
								differenceTime(
									hoverCustomPath2D.startTime,
									hoverCustomPath2D.endTime
								)
							)! / 60
						)}
					</p>
					<p>
						사용시간(초):{' '}
						{toSecondsByMilliseconds(
							differenceTime(
								hoverCustomPath2D.startTime,
								hoverCustomPath2D.endTime
							)
						)}
					</p>
				</div>
			)}
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

// 랜덤 색상 유틸 함수

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
