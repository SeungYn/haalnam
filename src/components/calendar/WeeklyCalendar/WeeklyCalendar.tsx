'use client';

import { useSelectedDateStore } from '@/store/dateStore';
import { DownArrowIcon } from '../../icons';
import './WeeklyCalendar.css';
import { MouseEvent, useEffect, useState } from 'react';

const DayToName: { [key: number | string]: string } = {
	0: '일',
	1: '월',
	2: '화',
	3: '수',
	4: '목',
	5: '금',
	6: '토',
};

type Props = {
	selectedDate: Date;
	setSelectedDate: (data: Date) => void;
	nickname?: string;
};

export default function WeeklyCalendar({
	selectedDate,
	setSelectedDate,
	nickname = '',
}: Props) {
	const [isMounting, setIsMounting] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [weekDates, setWeekDates] = useState<Date[]>([]);
	// const { selectedDate, setSelectedDate } = useSelectedDateStore();
	const [calendar, setCalendar] = useState<Calendar[]>([]);
	// 캘린더에서 관리하는 날짜
	const [calendarDate, setCalendarDate] = useState(selectedDate);
	// 닉네임 필터링
	const filterNickname =
		nickname.length > 20 ? nickname.slice(0, 18) + '...' : nickname;

	const onPrevMonth = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setCalendarDate(
			new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1)
		);
	};

	const onNextMonth = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setCalendarDate(
			new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1)
		);
	};

	useEffect(() => {
		if (isOpen) {
			setIsMounting(true);
		} else {
			setIsMounting(false);
			// 팝업이 닫히면 달력 초기화
			setCalendarDate(selectedDate);
		}
	}, [isOpen]);

	// 이번주 날짜 세팅 "일 월 화 수 목 금 토"
	useEffect(() => {
		// 입력된 날짜를 기준으로 해당 날짜가 있는 주의 일요일과 토요일을 계산
		const inputDate = new Date(selectedDate);
		const dayOfWeek = inputDate.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

		// 주의 일요일을 계산
		const sunday = new Date(inputDate);
		sunday.setDate(inputDate.getDate() - dayOfWeek);

		// 주의 토요일을 계산
		const saturday = new Date(sunday);
		saturday.setDate(sunday.getDate() + 6);

		// 주의 모든 날짜를 배열로 저장
		const weekDates = [];
		for (let i = 0; i < 7; i++) {
			const weekDate = new Date(sunday);
			weekDate.setDate(sunday.getDate() + i);
			weekDates.push(weekDate);
		}
		setWeekDates([...weekDates]);
	}, [selectedDate]);

	// 달력 만드는 effect
	useEffect(() => {
		// 현재 달력이 만들어 있지 않으면 선택된 날을 기준으로 만듬
		setCalendar(makeCalendar(calendarDate));
	}, [calendarDate]);

	return (
		<div className="mt-2 w-full">
			<div className="mb-4 flex gap-2">
				<button className="text-4xl" onClick={() => setIsOpen((s) => !s)}>
					<span>{`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월`}</span>
					<DownArrowIcon size="medium" className="ml-2 inline" />
				</button>

				<h2 className="flex grow items-center justify-center rounded-3xl border text-2xl">
					{nickname ? `${filterNickname}님의 하루` : '나의 하루'}
				</h2>
			</div>

			<div>
				<ul className="weekly__calendar">
					{weekDates.map((i) => (
						<li
							key={i.toDateString()}
							role="button"
							className={`${checkCurrentDate(selectedDate, i) ? 'active' : ''}`}
							onClick={() => setSelectedDate(i)}
						>
							<span>{DayToName[i.getDay()]}</span>
							<div>{i.getDate()}</div>
						</li>
					))}
				</ul>
			</div>
			{isOpen && (
				<div
					className="calendar__popup__container"
					onClick={() => setIsOpen(false)}
				>
					<div
						className={`${isMounting ? 'open' : 'close'} calendar__container`}
					>
						<nav className="calendar__header">
							<button className="px-8" onClick={(e) => onPrevMonth(e)}>
								{'<'}
							</button>
							<div>
								<p>{`${calendarDate.getFullYear()}년 ${calendarDate.getMonth() + 1}월`}</p>
								<button
									className="ml-4 rounded-lg border border-white px-2 text-base"
									onClick={() => setSelectedDate(new Date())}
								>
									오늘
								</button>
							</div>
							<button className="px-8" onClick={(e) => onNextMonth(e)}>
								{'>'}
							</button>
						</nav>
						<ul className="calendar__days">
							<li>일</li>
							<li>월</li>
							<li>화</li>
							<li>수</li>
							<li>목</li>
							<li>금</li>
							<li>토</li>
						</ul>
						<ul className="calendar">
							{calendar.map((c) => (
								<li
									role="button"
									key={c.date.toDateString()}
									className={`${c.accent ? 'calendar-textAccent' : 'calendar-textMute'} ${checkCurrentDate(c.date, new Date()) ? 'calendar-current' : ''} ${checkCurrentDate(c.date, selectedDate) ? 'calendar-selected' : ''}`}
									onClick={() => {
										setSelectedDate(c.date);
									}}
								>
									<p className="calendar__day">{c.day}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

const makeCalendar = (selectedCalendarDate: Date) => {
	const viewYear = selectedCalendarDate.getFullYear();
	const viewMonth = selectedCalendarDate.getMonth();

	// 지난 달 마지막 Date, 이번 달 마지막 Date
	const prevLast = new Date(viewYear, viewMonth, 0);
	const thisLast = new Date(viewYear, viewMonth + 1, 0);
	const nextDate = new Date(viewYear, viewMonth + 2, 0);

	const PLDate = prevLast.getDate();
	const PLDay = prevLast.getDay();

	const TLDate = thisLast.getDate();
	const TLDay = thisLast.getDay();

	// Dates 기본 배열들

	const prevDates: Calendar[] = [];
	const thisDates: Calendar[] = Array.from({ length: TLDate }, (_, day) => ({
		date: new Date(thisLast.getFullYear(), thisLast.getMonth(), day + 1),
		day: day + 1,
		accent: true,
	}));

	const nextDates: Calendar[] = [];

	// prevDates 계산
	if (PLDay !== 6) {
		for (let i = 0; i <= PLDay; i++) {
			const day = PLDate - i;
			prevDates.unshift({
				date: new Date(prevLast.getFullYear(), prevLast.getMonth(), day),
				day,
				accent: false,
			});
		}
	}

	// nextDates 계산
	for (let i = 1; i < 7 - TLDay; i++) {
		const day = i;
		nextDates.push({
			date: new Date(nextDate.getFullYear(), nextDate.getMonth(), day),
			day,
			accent: false,
		});
	}

	// Dates 합치기
	const dates = prevDates.concat(thisDates, nextDates);

	return dates;
};

function checkCurrentDate(selectedDate: Date, targetDate: Date) {
	const [sy, sm, sd] = [
		selectedDate.getFullYear(),
		selectedDate.getMonth(),
		selectedDate.getDate(),
	];
	const [ty, tm, td] = [
		targetDate.getFullYear(),
		targetDate.getMonth(),
		targetDate.getDate(),
	];

	if (sy === ty && sm === tm && sd === td) return true;
	return false;
}
