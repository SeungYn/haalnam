'use client';

import { Button } from '@/components/common';
import Image from 'next/image';
import kakaoImage from '@/assets/kakao/kakao_login_medium_wide.png';
import { signIn, useSession } from 'next-auth/react';

export function IntroLogin() {
  const session = useSession();
  //console.log(session?.data?.user);

  const onClick = () => {
    console.log('click');
    signIn();
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
