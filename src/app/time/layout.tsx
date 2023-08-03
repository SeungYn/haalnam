import { PropsWithChildren } from 'react';

type Props = {};

export default function layout({ children }: PropsWithChildren<Props>) {
  return <section className='h-full'>{children}</section>;
}
