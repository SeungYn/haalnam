'use client';

type Prop = {
  time: number;
};
export function TimeMoney({ time }: Prop) {
  return (
    <div className='mt-5 text-center'>
      <h2 className='text-white text-4xl'>
        만약 1초가 1원이면{' '}
        <span className='text-accent' suppressHydrationWarning>
          {' '}
          {time.toString().slice(0, 5)}원
        </span>{' '}
        남았습니다
      </h2>
    </div>
  );
}
