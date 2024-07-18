'use client';

import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '../../common';
import { DownArrowIcon } from '../../icons';
import './WeeklyCalendar.css';
import { useEffect, useState } from 'react';

const DayToName: { [key: number | string]: string } = {
	0: '일',
	1: '월',
	2: '화',
	3: '수',
	4: '목',
	5: '금',
	6: '토',
};

export default function WeeklyCalendar() {
	const [isMounting, setIsMounting] = useState(false);
	const [isOpen, setIsOpen] = useState(true);
	const [weekDates, setWeekDates] = useState<Date[]>([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [calendar, setCalendar] = useState<Calendar[]>([]);

	useEffect(() => {
		if (isOpen) {
			setIsMounting(true);
		} else {
			setIsMounting(false);
		}
	}, [isOpen]);

	// 이번주 날짜 세팅 "일 월 화 수 목 금 토"
	useEffect(() => {
		// 입력된 날짜를 기준으로 해당 날짜가 있는 주의 일요일과 토요일을 계산
		const inputDate = new Date();
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

		setCalendar(makeCalendar(new Date()));
	}, []);

	return (
		<div className="mt-2 w-full">
			<div className="mb-4">
				<button className="text-4xl" onClick={() => setIsOpen((s) => !s)}>
					<span>2024년 7월</span>
					<DownArrowIcon size="medium" className="ml-2 inline" />
				</button>
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
					onClick={() => setIsOpen(true)}
				>
					<div
						className={`${isMounting ? 'open' : 'close'} calendar__container`}
					>
						<nav className="calendar__header">
							<button>{'<'}</button>
							<div>
								<p>2222년 10월</p>
								<button>오늘</button>
							</div>
							<button>{'>'}</button>
						</nav>
						<ul className='calendar__days'>
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
								<li key={c.date.toDateString()}>{c.day}</li>
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
