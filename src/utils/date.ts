export const FrameSeconds = 16.7;

// 프리즈마 db 넣어줄 때 강제로 9시간 추가 시켜줌. 프리즈마는 UTC 시간을 따르기 때문에 한국 시간대가 적용이 안 됌.
export function getNowDate() {
  const date = new Date();
  date.setHours(date.getHours() + 9);
  return date;
}

// 현재 yyyy-mm-dd 형식 날짜 만들어주는 함수
export function getNowYYYY_MM_DD() {
  const date = new Date();
  date.setHours(date.getHours() + 9);
  // ISOString는 UTC 00:00 시 기준으로 나타내줌
  return new Date(`${date.toISOString().split('T')[0]}T00:00:00Z`);
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
