'use client';

import { Button } from '@/components/common';
import { ChangeEvent, useState } from 'react';

export default function TimeForm() {
  const [timeTitle, setTimeTitle] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTimeTitle(value);
  };

  return (
    <form className='flex flex-col items-center gap-4 w-full'>
      <input
        type='text'
        className='w-full max-w-2xl px-7 py-2 rounded-[100px] border-2 border-main text-2xl'
        onChange={onChange}
        value={timeTitle}
        placeholder='주제 ex: 운동하기'
      />
      <Button size='medium'>타이머 시작하기</Button>
    </form>
  );
}
