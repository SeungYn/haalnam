'use client';

import { Button } from '@/components/common';
import Image from 'next/image';
import kakaoImage from '@/assets/kakao/kakao_login_medium_wide.png';

export function IntroLogin() {
  const onClick = () => {
    console.log('click');
  };
  return (
    <>
      <h3 className='mt-6 text-3xl text-white'>
        로그인해서 시간을 알차게 사용하세요!!
      </h3>
      <Button className='mt-4' onClick={onClick}>
        <Image src={kakaoImage} alt='kakao login' />
      </Button>
    </>
  );
}
