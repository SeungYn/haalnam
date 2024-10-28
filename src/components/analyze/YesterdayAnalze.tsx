'use client';
import { Time } from '@prisma/client';
import TimeChart from '../home/time/chart/TimeChart/TimeChart';
import TimeChartLabel from '../home/time/chart/label/TimeChartLabel';
import { Button } from '../common';
import { differenceTime, toSecondsByMilliseconds } from '@/utils/date';
import { interFont } from '@/fonts';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowBackIcon, IoIosArrowForwardIcon } from '../icons';
import LineChart from './LineChart';

type YesterdayAnalzeType = {
	setOpen: (f: boolean) => void;
	times: Time[];
	aWeekTotalTimesByDate: { time: number; date: Date }[];
	betweenTimes: Time[];
};
const Silde_Size = 3;
export default function YesterdayAnalze({
	times,
	betweenTimes,
	aWeekTotalTimesByDate,
	setOpen,
}: YesterdayAnalzeType) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const slideViewportRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);
	const slideRef = useRef<HTMLDivElement>(null);

	const totalTimeBySeconds = toSecondsByMilliseconds(
		times.reduce((p, c) => {
			if (!c.endTime) return p;

			return p + differenceTime(c.startTime!, c.endTime!)!;
		}, 0)
	)!;

	const totalBetweenTimeBySeconds = toSecondsByMilliseconds(
		betweenTimes.reduce((p, c) => {
			if (!c.endTime) return p;

			return p + differenceTime(c.startTime!, c.endTime!)!;
		}, 0)
	)!;

	const hours = Math.floor(totalTimeBySeconds / (60 * 60));
	const minutes = Math.floor((totalTimeBySeconds % (60 * 60)) / 60);

	const betweenHours = Math.floor(totalBetweenTimeBySeconds / (60 * 60));
	const betweenMinutes = Math.floor(
		(totalBetweenTimeBySeconds % (60 * 60)) / 60
	);

	//console.log(slideRef.current?.getBoundingClientRect());
	//console.log(slideRef.current && window?.getComputedStyle(slideRef.current!));
	const onNext = () => {
		setCurrentIndex((v) => {
			const nextIndex = v + 1;
			if (nextIndex >= Silde_Size) return v;
			return nextIndex;
		});
	};
	const onPrev = () => {
		setCurrentIndex((v) => {
			const nextIndex = v - 1;
			if (nextIndex < 0) return v;
			return nextIndex;
		});
	};

	// 슬라이드 effect
	useEffect(() => {
		if (!slideViewportRef.current) return;
		slideCallback();

		function slideCallback() {
			if (!slideRef.current || !window) return;
			let slideSize =
				slideRef.current?.getBoundingClientRect().width! +
				parseFloat(window.getComputedStyle(slideRef.current!).marginRight);
			sliderRef.current!.style.transform = `translate(-${slideSize * currentIndex}px, 0)`;
		}

		const resizeObserver = new ResizeObserver((entries) => {
			slideCallback();
		});

		resizeObserver.observe(slideViewportRef.current!);
		return () => {
			slideViewportRef.current &&
				resizeObserver.unobserve(slideViewportRef.current!);
		};
	}, [currentIndex]);

	return (
		<div className="relative px-2 py-4 md:mx-10 md:py-10">
			<div ref={slideViewportRef} className="w-full overflow-hidden">
				<div
					ref={sliderRef}
					className="relative flex transition-all [&>div]:mr-10"
				>
					<div
						ref={slideRef}
						className="flex w-full shrink-0 flex-col items-center gap-10"
					>
						<TimeChart times={times} />
						<TimeChartLabel times={times} />
						<div className={`${interFont.className} text-2xl`}>
							<p>{`어제 총 ${hours > 0 ? `${hours} 시간` : ''} ${minutes} 분을 사용하셨어요! `}</p>
							<p>{`1초가 1원이면 ${totalTimeBySeconds}원을 사용하셨어요! `}</p>
						</div>
					</div>

					<div className="flex w-full flex-shrink-0 flex-col items-center gap-10">
						<TimeChart times={betweenTimes} />

						<div className={`${interFont.className} text-2xl`}>
							<p>{`어제 첫 타이머와 마지막 타이머 사이`}</p>
							<p>{`총 ${betweenHours > 0 ? `${betweenHours}시간` : ''} ${betweenMinutes}분이 비어져있었어요! `}</p>
						</div>
					</div>
					<div className="flex w-full flex-shrink-0 flex-col items-center pt-10 text-2xl">
						<h2 className="text-4xl">주간 차트</h2>
						<LineChart
							data={aWeekTotalTimesByDate.map((d) => ({
								x: d.date,
								y: d.time,
								...d,
							}))}
						/>
					</div>
				</div>

				<button
					className={`absolute left-0 top-0 h-full text-7xl ${currentIndex === 0 ? 'text-white/50' : 'text-white'}`}
				>
					<IoIosArrowBackIcon onClick={onPrev} />
				</button>
				<button
					className={`absolute right-0 top-0 h-full text-7xl ${currentIndex === Silde_Size - 1 ? 'text-white/50' : 'text-white'}`}
				>
					<IoIosArrowForwardIcon onClick={onNext} />
				</button>
			</div>

			<div className="mt-10 w-full">
				<Button
					size="medium"
					className="inline-block w-full"
					onClick={() => setOpen(false)}
				>
					확인
				</Button>
			</div>
		</div>
	);
}
