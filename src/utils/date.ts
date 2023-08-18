export const FrameSeconds = 16.7;

export function getNowDate() {
  const date = new Date();
  date.setHours(date.getHours() + 9);
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
