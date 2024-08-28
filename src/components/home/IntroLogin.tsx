'use client';

import Image from 'next/image';
import kakaoImage from '@/assets/kakao/kakao_login_medium_wide.png';
import { signIn } from 'next-auth/react';
import { Button } from '../common';

export function IntroLogin() {
	const onClick = () => {
		// 기본적으로 프로바이더를 명시하면 해당 프로바이더 로그인 창이 뜸. 이후 callbackUrl은 로그인을 성공하면 리다이렉트 시킬 url임
		signIn('kakao', { callbackUrl: '/' });
	};
	return (
		<>
			<h3 className="mt-6 text-3xl text-white">
				로그인해서 시간을 알차게 사용하세요!!
			</h3>
			<Button className="mt-4 border-none" onClick={onClick}>
				<Image src={kakaoImage} alt="kakao login" />
			</Button>
		</>
	);
}
