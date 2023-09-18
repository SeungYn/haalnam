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
  const [timer, setTimer] = useState(0);

  // useRequestAnimationFrame(() => {
  //   setTimer(incrementTime);
  // });

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
