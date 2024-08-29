/* eslint-disable */

import { Plan, Time } from '@prisma/client';

import {
	MouseEvent,
	useLayoutEffect,
	useRef,
	useState,
	TouchEvent,
	FormEvent,
} from 'react';
import { usePostAddTimer } from '@/hooks/api/time';
import {
	radianToTime,
	makeChartGradutionTimeInfo,
	stringTimeToRadian,
	radianToAngle,
	ChartCanvasPixelSize,
	getAngleFromCoordinates,
} from '@/utils/chart';
import { Button } from '@/components/common';
import { IoReloadCircleOutlineIcon } from '@/components/icons';
import useIsMobile from '@/hooks/common/useIsMobile';
import PlanTimeChart from '../PlanTimeChart/PlanTimeChart';
import { PostPlanRequest } from '@/service/types/plan';

type Props = {
	closePopUp: () => void;
	times: Plan[];
	addPlanTime: (req: Omit<PostPlanRequest, 'planPageId'>) => void;
};

// 1. 시작시간 선택
// 2. 시작시간이 가능한 시간인지 체크
// 3. 안되면 상단에 표시
// 4. 종료시간 선택
// 5. 만약 타이머가 있다면 최대 겹치는 타이머 전까지 시간을 채워줌

// 변경: 기존 타이머 추가에서 times와 add 이벤트를 외부에서 주입받도록 변경
// 이후 타이머든 계획이든 어떤 데이터에 관계 없이 사용할 수 있는 컴포넌트로 통합 예정

export default function PlanTimeChartAddForm({
	closePopUp,
	times,
	addPlanTime,
}: Props) {
	const [addChartWidth, setAddChartWidth] = useState<number>(250);
	const timeChartAddModifyCanvas = useRef<HTMLCanvasElement>(null);
	const [subject, setSubject] = useState('');
	const addMutateTimer = usePostAddTimer(closePopUp);
	const isMobile = useIsMobile();
	const [error, setError] = useState('');
	const [angles, setAngles] = useState<{
		start: ReturnType<typeof getAngleFromCoordinates> | null;
		end: ReturnType<typeof getAngleFromCoordinates> | null;
	}>({ start: null, end: null });
	const [currentAngles, setCurrentAngles] = useState<ReturnType<
		typeof getAngleFromCoordinates
	> | null>(null);
	const chartSizeRatio = ChartCanvasPixelSize / addChartWidth;

	const onTouchMoveEvent = (e: TouchEvent<HTMLDivElement>) =>
		onMoveEvent(
			e.touches[0].clientX,
			e.touches[0].clientY,
			e.currentTarget as HTMLElement
		);

	const onMouseMoveEvent = (e: MouseEvent) =>
		onMoveEvent(e.clientX, e.clientY, e.currentTarget as HTMLElement);

	const onMoveEvent = (
		clientX: number,
		clientY: number,
		currentTarget: HTMLElement
	) => {
		const rect = currentTarget.getBoundingClientRect();
		const x = clientX - rect.left;
		const y = clientY - rect.top;
		if (x < 0 || y < 0) return;
		onSetCurrentAngle(x, y);
	};

	const onSetCurrentAngle = (x: number, y: number) => {
		if (x < 0 || y < 0) return;
		if (angles.start && angles.end) {
			setCurrentAngles(null);
			return;
		}
		const ctx = timeChartAddModifyCanvas.current?.getContext('2d');

		if (!ctx) return;
		// 사파리가 아닐경우 진동
		if (!window.navigator.userAgent.toLocaleLowerCase().includes('safari')) {
			window.navigator?.vibrate(1);
		}
		ctx.fillStyle = 'white';

		let angleData = getAngleFromCoordinates(
			x,
			y,
			addChartWidth / 2,
			addChartWidth / 2
		);

		const originX = ChartCanvasPixelSize / 2;

		let overlappingTime = checkStartOverlappingTime(times, angleData[1]);

		setError(
			overlappingTime
				? '이미 타이머가 진행된 시간대입니다., 다른 시간대를 선택해주세요'
				: ''
		);
		ctx.fillStyle = overlappingTime ? 'red' : 'white';
		ctx.strokeStyle = overlappingTime ? 'red' : 'white';

		// 추가 조건
		/**
		 * 시작 시간은 타이머 기간 이면 안됨
		 * 종료 시간은 어떤 타이머 기간에 포함되면 안되고 추가한 시간이 기존 시간을 포함하고 있으면 안됨.
		 */
		// 시작 시간 설정
		if (!angles.start) {
			clearCanvas();
			setCurrentAngles([...angleData]);
			drawArcCanvasByRadian(
				originX,
				angleData[1],
				angleData[1] + Math.PI / (12 * 60)
			);
		} // 종료 시간 설정
		else if (angles.start !== null && !angles.end) {
			clearCanvas();
			const angleDifferenceStartEnd = angleData[0] - angles.start[0];
			if (angleDifferenceStartEnd <= 0) return;
			overlappingTime = checkEndOverlappingTime(times, angleData[1]);
			if (overlappingTime) {
				// 라디안에서 1분 빼줌
				const filterdOverlappingTime = overlappingTime - Math.PI / (12 * 60);
				angleData = [
					radianToAngle(filterdOverlappingTime),
					filterdOverlappingTime,
				];
				setError(
					'이미 타이머가 진행된 시간대입니다., 다른 시간대를 선택해주세요'
				);
				ctx.fillStyle = 'red';
				ctx.strokeStyle = 'red';
			} else {
				setError('');
				ctx.fillStyle = 'white';
				ctx.strokeStyle = 'white';
			}

			setCurrentAngles([...angleData]);
			drawArcCanvasByRadian(originX, angles.start[1], angleData[1]);
		}
	};

	/**
	 * 선택된 시간에 타이머가 진행했는지 확인해주는 함수
	 * @param times
	 * @returns
	 */
	const checkStartOverlappingTime = (
		times: Time[] | Plan[],
		currentRadian: number
	) => {
		for (let i = 0; i < times.length; i++) {
			const currentTime = times[i];
			if (currentTime.endTime === null) continue;
			const startTime = currentTime.startTime;
			const endTime = currentTime.endTime;

			const startTimeRaian = stringTimeToRadian(String(startTime));
			const endTimeRaian = stringTimeToRadian(String(endTime));

			if (startTimeRaian <= currentRadian && currentRadian <= endTimeRaian) {
				return startTimeRaian;
			}
		}

		return null;
	};

	const checkEndOverlappingTime = (
		times: Time[] | Plan[],
		currentRadian: number
	) => {
		for (let i = 0; i < times.length; i++) {
			const currentTime = times[i];
			if (currentTime.endTime === null) continue;
			const startTime = currentTime.startTime;
			const endTime = currentTime.endTime;

			const startTimeRaian = stringTimeToRadian(String(startTime));
			const endTimeRaian = stringTimeToRadian(String(endTime));

			// 타이머가 지나간 시간대에 endTime이 겹칠 때
			if (startTimeRaian <= currentRadian && currentRadian <= endTimeRaian) {
				return startTimeRaian;
			} else if (
				angles.start !== null &&
				startTimeRaian <= angles.start[1] &&
				angles.start[1] <= endTimeRaian
			) {
				// 시작 시간이 타이마에 겹칠 때
			} else if (
				angles.start !== null &&
				startTimeRaian <= angles.start[1] &&
				currentRadian <= endTimeRaian
			) {
				// 타이머 시간대 사이에 추가 시간이 포함 될 때
			} else if (
				angles.start !== null &&
				angles.start[1] <= startTimeRaian &&
				endTimeRaian <= currentRadian
			) {
				// 추가된 시간이 기존 타이머를 감쌀 때
				return startTimeRaian;
			}
		}

		return null;
	};

	const onSetTime = () => {
		const originX = ChartCanvasPixelSize / 2;
		if (error !== '') return;
		if (currentAngles === null) return;

		if (!angles.start) {
			clearCanvas();
			setAngles((s) => ({ ...s, start: [...currentAngles!] }));

			drawArcCanvasByRadian(
				originX,
				currentAngles![1],
				currentAngles![1] + Math.PI / (12 * 60)
			);
		} // 종료 시간 설정
		else if (angles.start !== null && !angles.end) {
			const angleDifferenceStartEnd = currentAngles![1] - angles.start![1];
			if (angleDifferenceStartEnd <= 0) return;

			setAngles((s) => ({ ...s, end: [...currentAngles!] }));

			drawArcCanvasByRadian(originX, angles.start[1], currentAngles![1]);
		}
	};

	const drawArcCanvasByAngle = (
		originX: number,
		startAngle: number,
		endAngle: number
	) => {
		const ctx = timeChartAddModifyCanvas.current?.getContext('2d');
		if (!ctx) return;
		ctx.beginPath();
		ctx.moveTo(originX, originX);
		ctx.arc(
			originX,
			originX,
			originX,
			startAngle * (Math.PI / 180) - Math.PI / 2,
			endAngle * (Math.PI / 180) - Math.PI / 2
		);
		ctx.fill();
		ctx.closePath();
	};

	const drawArcCanvasByRadian = (
		originX: number,
		startRadian: number,
		endRadian: number
	) => {
		const ctx = timeChartAddModifyCanvas.current?.getContext('2d');
		if (!ctx) return;
		ctx.beginPath();
		ctx.moveTo(originX, originX);
		ctx.arc(
			originX,
			originX,
			originX,
			startRadian - Math.PI / 2,
			endRadian - Math.PI / 2
		);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};

	const clearCanvas = () => {
		timeChartAddModifyCanvas.current
			?.getContext('2d')
			?.clearRect(
				0,
				0,
				timeChartAddModifyCanvas.current.width,
				timeChartAddModifyCanvas.current.height
			);
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (angles.start === null || angles.end === null) {
			alert('시작시간 및 종료시간을 정해주세요');
			return;
		}
		if (subject === '') {
			alert('주제를 적어주세요');
			return;
		}
		const startTime = radianToTime(angles.start[1]);
		const endTime = radianToTime(angles.end[1]);

		// todo: 계획 추가 api
		addPlanTime({ startTime, subject, endTime });
	};

	useLayoutEffect(() => {
		const mediaQuery = window.matchMedia('screen and (min-width:640px)');
		const mbileMediaQuery = window.matchMedia('screen and (min-width:390px)');
		const changeCB = () => {
			if (mediaQuery.matches) {
				setAddChartWidth(600);
			} else {
				if (mbileMediaQuery.matches) {
					setAddChartWidth(300);
				} else {
					setAddChartWidth(250);
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

	return (
		<div className="flex flex-col items-center">
			<TimeChartAddHeader
				angles={angles}
				currentAngles={currentAngles}
				error={error}
			/>

			<div className="relative flex items-center justify-center py-14">
				<div className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
					<PlanTimeChart times={times} mode="Add" />
				</div>

				<div
					className={`z-40 ${isMobile ? '' : 'cursor-pointer'} touch-none`}
					onTouchMove={isMobile ? onTouchMoveEvent : undefined}
					onTouchEnd={isMobile ? onSetTime : undefined}
					onMouseMove={!isMobile ? onMouseMoveEvent : undefined}
					onClick={!isMobile ? onSetTime : undefined}
				>
					<canvas
						ref={timeChartAddModifyCanvas}
						className="relative z-50 rounded-full"
						style={{ width: addChartWidth, height: addChartWidth }}
						width={ChartCanvasPixelSize}
						height={ChartCanvasPixelSize}
					></canvas>
				</div>

				{/* 눈금 별 시간 표시 */}
				{makeChartGradutionTimeInfo((addChartWidth + 42) / 2).map((v) => {
					return (
						<div
							suppressHydrationWarning
							key={JSON.stringify(v)}
							className="absolute text-2xl"
							style={{
								transform: `translate(${v.x}px, ${v.y}px)`,
							}}
						>
							{v.time}
						</div>
					);
				})}
				{/* 중앙 동그라미 */}
				<div className="absolute left-1/2 top-1/2 z-50 h-[20px] w-[20px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-h_black sm:h-[30px] sm:w-[30px]"></div>
			</div>
			<form onSubmit={onSubmit}>
				<div className="mb-10 flex flex-col items-center gap-4">
					<input
						type="text"
						className="w-full max-w-2xl rounded-[100px] border-2 border-h_light_black bg-h_black px-7 py-2 text-2xl focus:border-white"
						onChange={(e) => setSubject(e.target.value)}
						value={subject}
						placeholder="주제 ex: 운동하기"
					/>
					<div className="flex items-center gap-10">
						<div>
							<p className="mb-4 min-w-[2rem] text-4xl tabular-nums">
								시작시간:{' '}
								{angles.start ? (
									radianToTime(angles.start[1]).str
								) : (
									<span className="invisible">99시 99분</span>
								)}
							</p>
							<p className="min-w-[2rem] text-4xl tabular-nums">
								종료시간:{' '}
								{angles.end ? (
									radianToTime(angles.end[1]).str
								) : (
									<span className="invisible">99시 99분</span>
								)}
							</p>
						</div>
						<Button
							className="rounded-full border-none"
							type="button"
							onClick={() => {
								if (angles.end) {
									setAngles((s) => ({ ...s, end: null }));
									return;
								} else if (angles.start && angles.end === null) {
									setAngles((s) => ({ ...s, start: null }));
								}
							}}
						>
							<IoReloadCircleOutlineIcon size="large" />
						</Button>
					</div>
				</div>

				<div className="relative mb-20">
					<Button
						size="medium"
						className="w-full"
						isLoading={addMutateTimer.isLoading}
						disabled={angles.start === null || angles.end === null}
					>
						계획 추가하기
					</Button>
				</div>
			</form>
		</div>
	);
}

type TimeChartAddHeaderProps = {
	angles: {
		start: [number, number] | null;
		end: [number, number] | null;
	};
	currentAngles: [number, number] | null;
	error: string;
};
function TimeChartAddHeader({
	angles,
	currentAngles,
	error,
}: TimeChartAddHeaderProps) {
	let message = '기본메세지';
	if (angles.start === null) message = '시작 시간을 선택해주세요';
	else if (angles.start !== null && angles.end === null)
		message = '종료 시간을 선택해주세요';
	else message = '시간 선택이 완료됐습니다';

	return (
		<>
			<h3
				className={`text-4xl ${message === '기본메세지' ? 'invisible' : 'visible'}`}
			>
				{message}
			</h3>
			<div className="text-3xl">
				{currentAngles !== null ? (
					error !== '' ? (
						<>
							<p className="break-keep text-center text-main">
								{error.split(',')[0]}
							</p>
							<p className="break-keep text-center text-main">
								{error.split(',')[1] === '' ? ' ' : error.split(',')[1]}
							</p>
						</>
					) : (
						<p>
							{radianToTime(currentAngles![1]).str}
							<span className="invisible block">' '</span>
						</p>
					)
				) : (
					<>
						<span className="invisible block">' '</span>
						<span className="invisible block">' '</span>
					</>
				)}
			</div>
		</>
	);
}
