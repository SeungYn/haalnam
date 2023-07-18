type Prop = {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export function Time({ hours, minutes, seconds, milliseconds }: Prop) {
  return (
    <h2 className='text-6xl text-neutral-200  flex flex-col justify-center items-center text-center sm:flex-row'>
      <span>현재 </span>
      <div className='flex text-red-300'>
        <p className='w-20' suppressHydrationWarning>
          {hours}
        </p>
        <span>시간</span>
        <p className='w-20' suppressHydrationWarning>
          {minutes}
        </p>
        <span>분</span>
        <p className='w-20' suppressHydrationWarning>
          {seconds}
        </p>
        <span>초</span>
        <p className='w-32' suppressHydrationWarning>
          {milliseconds}
        </p>
      </div>
      <span>남았습니다</span>
    </h2>
  );
}
