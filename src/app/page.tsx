import Image from 'next/image';
import { begel } from './font';
import { sincerity } from '@/fonts';
import Timer from '@/components/home/Timer';

export default function Home() {
  return (
    <div className='w-full h-full flex justify-center'>
      <h1 className={`text-5xl text-neutral-100 mt-8 text-center font-bold `}>
        하루를 <strong className='text-red-300'>어떻게</strong> <br />{' '}
        사용하셨나요?
      </h1>
      <Timer />
    </div>
  );
}
