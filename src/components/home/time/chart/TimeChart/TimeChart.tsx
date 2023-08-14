'use client';

import {
  getChartDegrees,
  type ChartSize,
  makeChartGradutionTimeInfo,
} from '@/utils/chart';
import { ROTATE_DEG } from '@/utils/size';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Props = {};

export default function TimeChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartWidth, setChartWidth] = useState<ChartSize>(300);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('screen and (min-width:640px)');
    const changeCB = () => {
      if (mediaQuery.matches) {
        setChartWidth(600);
      } else {
        setChartWidth(300);
      }
    };
    if (mediaQuery.matches) {
      setChartWidth(600);
    } else {
      setChartWidth(300);
    }
    mediaQuery.addEventListener('change', changeCB);

    return () => {
      mediaQuery.removeEventListener('change', changeCB);
    };
  }, []);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
    const startX = parseInt(String(chartWidth / 2));

    ctx.beginPath();
    ctx.moveTo(startX, startX);
    ctx.arc(
      startX,
      startX,
      chartWidth,
      (Math.PI / 180) * 40,
      (Math.PI / 180) * 90,
      false
    );
    ctx.fillStyle = 'rgb(0, 255, 255)'; //채울 색상
    ctx.strokeStyle = 'rgb(0, 255, 255)'; //채울 색상
    ctx.closePath();
    ctx.fill(); //채우기
    ctx.stroke(); //테두리
  }, [canvasRef, chartWidth]);

  return (
    <div className='relative p-10'>
      {makeChartGradutionTimeInfo((chartWidth + 45) / 2).map((v) => {
        return (
          <div
            className='absolute text-2xl'
            style={{
              transform: `translate(${v.x + chartWidth / 2}px, ${
                v.y + chartWidth / 2
              }px) translate(-50%, -50%)`,
            }}
          >
            {v.time}
          </div>
        );
      })}
      <div className='w-[300px] h-[300px] outline outline-2 outline-black rounded-full relative overflow-hidden  sm:w-[600px] sm:h-[600px]'>
        <canvas
          ref={canvasRef}
          width={chartWidth}
          height={chartWidth}
          className='absolute z-30 '
        ></canvas>
        {/* <div className='text-3xl rotate text-pink-400 z-50 relative top-40 text-center'>
          123
        </div> */}

        {makeGradution(24)}
      </div>
    </div>
  );
}

function makeGradution(count: number) {
  const list: JSX.Element[] = [];

  for (let i = 0; i < count; i++) {
    const element = (
      <div
        key={i}
        className={`absolute w-full h-[2px] bg-black transform ${
          ROTATE_DEG[i * 15]
        } top-[calc(50%-1px)]`}
      ></div>
    );
    list.push(element);
  }

  return list;
}
