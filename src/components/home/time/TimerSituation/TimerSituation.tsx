'use client';

import { Button } from '@/components/common';
import { TimeContextType } from '@/context/TimeContext';
import { useRequestAnimationFrame } from '@/hooks/common';
import { FrameSeconds, millsecondsToSeconds } from '@/utils/date';
import { useState } from 'react';

type Props = {} & TimeContextType;

export default function TimerSituation({ startTime, status, subject }: Props) {
  const [timer, setTimer] = useState(0);

  useRequestAnimationFrame(() => {
    setTimer(incrementTime);
  });

  return (
    <div className='w-full max-w-3xl text-center text-yellow-100 text-4xl flex flex-col items-center gap-4'>
      <h3 className='bg-main p-4 rounded-full w-full'>{`현재 ${subject}에 ${millsecondsToSeconds(
        timer
      )}초(원) 사용하셨습니다.`}</h3>
      <Button size='medium'>타이머 종료하기</Button>
    </div>
  );
}

const incrementTime = (n: number) => parseInt(String(n + FrameSeconds));
