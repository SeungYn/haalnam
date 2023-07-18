'use client';

import useRequestAnimationFrame from '@/hooks/common/useRequestAnimationFrame';
import { useEffect, useState } from 'react';

const FrameSeconds = 16.7;

export default function Timer() {
  const [time, setTime] = useState(getRemainingTime);

  useRequestAnimationFrame(() => {
    setTime(reduceTime);
  });

  // useEffect(() => {
  //   let animationFrameId: any;

  //   const updateTime = (e: DOMHighResTimeStamp) => {
  //     setTime((prevTime) => parseInt(String(prevTime - 16.7)));
  //     animationFrameId = requestAnimationFrame((e) => updateTime(e));
  //   };

  //   animationFrameId = requestAnimationFrame(updateTime);
  //   document.addEventListener('visibilitychange', () => {
  //     if (!document.hidden) {
  //       console.log(getRemainingTime());
  //       setTime(getRemainingTime());
  //     }
  //   });
  //   return () => {
  //     console.log('clear');
  //     cancelAnimationFrame(animationFrameId);
  //   };
  // }, []);

  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div suppressHydrationWarning>
      {`${hours} ${minutes} ${seconds} ${milliseconds} `}
    </div>
  );
}

const reduceTime = (n: number) => parseInt(String(n - FrameSeconds));

function getRemainingTime() {
  return 86400000 - timeToMilliseconds(new Date());
}

function timeToMilliseconds(time: Date) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  return (
    hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000 + milliseconds
  );
}

function formatTime(milliseconds: number) {
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

// import { useEffect, useState } from 'react';

// export default function Timer() {
//   const [time, setTime] = useState(
//     () => 86400000 - timeToMilliseconds(new Date())
//   );
//   const { hours, minutes, seconds, milliseconds } = formatTime(time);
//   console.log(hours, minutes, seconds, milliseconds, time);
//   useEffect(() => {
//     const intervalid = setInterval(() => {
//       setTime((time) => time - 10);
//     }, 10000);

//     return () => {
//       clearInterval(intervalid);
//     };
//   }, []);

//   return (
//     <div suppressHydrationWarning>
//       {`${hours} ${minutes} ${seconds} ${milliseconds} `}
//     </div>
//   );
// }

// function timeToMilliseconds(time: Date) {
//   const hours = time.getHours();
//   const minutes = time.getMinutes();
//   const seconds = time.getSeconds();
//   const milliseconds = time.getMilliseconds();

//   return (
//     hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000 + milliseconds
//   );
// }

// function formatTime(milliseconds: number) {
//   const seconds = Math.floor(milliseconds / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);

//   const remainingMilliseconds = milliseconds % 1000;
//   const remainingSeconds = seconds % 60;
//   const remainingMinutes = minutes % 60;

//   return {
//     hours,
//     minutes: remainingMinutes,
//     seconds: remainingSeconds,
//     milliseconds: remainingMilliseconds,
//   };
// }
