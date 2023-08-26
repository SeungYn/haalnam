'use client';

import { Button } from '@/components/common';
import { Status } from '@prisma/client';
import { ChangeEvent, FormEventHandler, useState } from 'react';

type Props = {
  onStart: (startTime: Date, subject: string) => void;
};

export default function TimeForm({ onStart }: Props) {
  const [timeTitle, setTimeTitle] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTimeTitle(value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('subject', timeTitle);
    formData.append('status', Status.START);

    fetch('/api/time', { method: 'POST', body: formData })
      .then((res) => {
        if (res.ok) onStart(new Date(), timeTitle);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col items-center gap-4 w-full'
    >
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
