import TimeContextProvider from '@/context/TimeContext';
import { PropsWithChildren } from 'react';

type Props = {};

export default function layout({ children }: PropsWithChildren<Props>) {
  return (
    <section className='h-full flex flex-col items-center gap-4 overflow-auto'>
      <TimeContextProvider>{children}</TimeContextProvider>
    </section>
  );
}
