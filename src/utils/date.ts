export const FrameSeconds = 16.7;

// 프리즈마 db 넣어줄 때 강제로 9시간 추가 시켜줌. 프리즈마는 UTC 시간을 따르기 때문에 한국 시간대가 적용이 안 됌.
export function getNowDate() {
	const date = new Date();
	date.setHours(date.getHours() + 9);
	return date;
}

// 현재 yyyy-mm-ddT00:00:00Z 형식 날짜 만들어주는 함수
export function getNowYYYY_MM_DD() {
	const date = new Date();
	date.setHours(date.getHours() + 9);
	// ISOString는 UTC 00:00 시 기준으로 나타내줌 ISOString을 안해주면 9시간 전으로 설정됨
	return new Date(`${date.toISOString().split('T')[0]}T00:00:00Z`);
}

/**
 * 년, 월, 날짜를 받아 Date객체를 만들어줌 9시간을 설정한 이유는 utc 기준 9시간을 뺴줘서 출력되기 때문
 * @param
 * @returns
 */
export function getFullDate(y: number, m: number, d: number) {
	const date = new Date(y, m, d, 9);
	return date;
}

/**
 * 각 파라미터를 받아 UTC 기준인데 한국날짜를 생성시켜줌
 * @param y
 * @param month
 * @param d
 * @param h
 * @param minutes
 * @returns
 */
export function makeUTCStringDate(
	y: number,
	month: number,
	d: number,
	h: number,
	minutes: number
) {
	const date = new Date(y, month, d, 9);
	date.setHours(h + 9, minutes);
	return date;
}

export function timeToMilliseconds(time: Date) {
	const hours = time.getHours();
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();
	const milliseconds = time.getMilliseconds();

	return (
		hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000 + milliseconds
	);
}

// 밀리초를 받아 시간, 분, 초, 밀리초로 반환하는 함수
export function formatTime(milliseconds: number) {
	const seconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	const remainingMilliseconds = milliseconds % 1000;
	const remainingSeconds = seconds % 60;
	const remainingMinutes = minutes % 60;

	return {
		hours,
		minutes: remainingMinutes,
		seconds: remainingSeconds,
		milliseconds: remainingMilliseconds,
	};
}

export function millsecondsToSeconds(time: number) {
	return parseInt(String(time / 1000));
}

/**
 * 2024-06-25T22:22:13.874Z 이런 형태 시간을
 * 0시 0분 0초로 변환해주는 함수
 * @param time
 * @returns
 */
export function formatDisplayTime(time: string | Date) {
	if (time instanceof Date) return '';
	const rightTime = time.split('T')[1].split(':');

	return `${rightTime[0]}시 ${rightTime[1]}분 ${parseInt(rightTime[2])}초`;
}

// 시작시간 종료시간 차이를 밀리초로 바꿔주는 함수
export function differenceTime(
	startTime: Date | string,
	endTime: Date | string
) {
	if (startTime instanceof Date || endTime instanceof Date) return;

	return (
		Date.parse(endTime as unknown as string) -
		Date.parse(startTime as unknown as string)
	);
}

/**
 * 2024-06-25T22:22:13.874Z ~ 2024-06-25T22:22:13.874Z 로 돼있는 time 문자열을 받아와 차이를 반환해주는 함수
 * @param time string 2024-06-25T22:22:13.874Z ~ 2024-06-25T22:22:13.874Z
 * @returns
 */
export function differenceFullTime(time: string) {
	const [startTime, endTime] = time.split('~');
	if (endTime === ' ' || endTime === '') return;

	return differenceTime(startTime.trim(), endTime.trim());
}

/**
 * 밀리초를 초로 바꿔주는 대신 올림 처리
 * @param milli
 * @returns
 */
export function toSecondsByMilliseconds(milli: string | number | undefined) {
	if (milli === undefined) return;
	return Math.ceil(Number(milli) / 1000);
}

/**
 * 클라이언트에서 현재 시간과 선택된 시간을 비교해서
 * 현재 날짜인지 확인해주는 함수
 */
export function isCurrentDay(selectedDate: Date) {
	const nowDate = new Date();
	const [cy, cm, cd] = [
		nowDate.getFullYear(),
		nowDate.getMonth(),
		nowDate.getDate(),
	];

	const [ty, tm, td] = [
		selectedDate.getFullYear(),
		selectedDate.getMonth(),
		selectedDate.getDate(),
	];

	return cy === ty && cm === tm && cd === td;
}

/**
 * 서버에서 받아온 date를 브라우저에서의 시간으로 변경시키는 함수
 * -9시간을 해줌. 서버는 UTC기준이기 때문
 * @param serverDate +9시간된 UTC 시간
 * @returns
 */
export function formatBroswerTime(serverDate: Date | string) {
	const date = new Date(serverDate);
	date.setHours(date.getHours() - 9);
	return date;
}
