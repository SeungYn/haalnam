'use client';

import { Button } from '@/components/common';
import { TimeContextType } from '@/context/TimeContext';
import { useRequestAnimationFrame } from '@/hooks/common';
import { FrameSeconds, millsecondsToSeconds } from '@/utils/date';
import { useEffect, useState } from 'react';

type Props = {
  onEndTime: () => void;
} & TimeContextType;

export default function TimerSituation({
  startTime,
  status,
  subject,
  onEndTime,
}: Props) {
  const [timer, setTimer] = useState(() => {
    if (startTime)
      return Math.floor((Date.now() - (startTime?.getTime() ?? 0)) / 1000);
    return 0;
  });

  // useRequestAnimationFrame(() => {
  //   setTimer(incrementTime);
  // });
  // 현재 사용자의 타임 상태를 db에도 계속 동기화를 해줘야함.
  console.log('timeSituation');
  useEffect(() => {
    const interID = setInterval(() => setTimer(incrementTime), 1000);

    return () => {
      clearInterval(interID);
    };
  }, []);

  return (
    <div className='w-full max-w-3xl text-center text-yellow-100 text-4xl flex flex-col items-center gap-4'>
      <h3 className='bg-main p-4 rounded-full w-full'>{`현재 ${subject}에 ${timer}초(원) 사용하셨습니다.`}</h3>
      <Button size='medium' onClick={() => onEndTime()}>
        타이머 종료하기
      </Button>
    </div>
  );
}

const incrementTime = (n: number) => parseInt(String(n + 1));
