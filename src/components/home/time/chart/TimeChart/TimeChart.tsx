'use client';

import { ROTATE_DEG } from '@/utils/size';

export default function TimeChart() {
  return (
    <div className='m-auto w-full relative aspect-square max-w-xl'>
      <div className='w-full h-full border-4 border-black rounded-full relative'>
        {makeGradution(24)}
        <div className='text-3xl rotate text-pink-400 z-50 relative top-40 text-center'>
          123
        </div>
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
        className={`absolute w-full h-1 bg-black transform ${
          ROTATE_DEG[i * 15]
        } top-[calc(50%-2px)]`}
      ></div>
    );
    list.push(element);
  }

  return list;
}
