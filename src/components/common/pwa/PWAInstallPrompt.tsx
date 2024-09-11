'use client';

import useIsMobile from '@/hooks/common/useIsMobile';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import { interFont } from '@/fonts';
import Cookie from '@/lib/cookie';
import { useRouter } from 'next/navigation';

export default function PWAInstallPrompt() {
	const isMobile = useIsMobile();
	const { isMounting, isOpen, setIsOpen, setIsMounting } = usePopUpStatus(700);
	const router = useRouter();
	const [installCb, setInstallCb] = useState(() => () => {
		router.push('/pwa');
	});

	// pwa 설치 프롬프트
	useEffect(() => {
		window.addEventListener('beforeinstallprompt', (event) => {
			event.preventDefault();
		});
		window.addEventListener('appinstalled', (event) => {
			localStorage.setItem('PwaInstalled', '1');
		});

		// 현재 pwa인지 확인하는 코드
		const isInStandaloneMode = window.matchMedia(
			'(display-mode: standalone)'
		).matches;

		// 현재 pwa면 localStorage에 저장
		if (isInStandaloneMode) {
			localStorage.setItem('PwaInstalled', '1');
		}

		// 현재 pwa이거나 pwa를 설치했으면, 팝업을 띄우지 않음.
		if (localStorage.getItem('PwaInstalled') === '1' || isInStandaloneMode)
			return;

		//pwa이면 설치하라고 하면 안됨.
		// 웹인데 모바일일 경우 2시간마다 설치하라 해야함.
		const userAgent = navigator.userAgent.toLowerCase();

		// 브라우저가 어떤 브라우저인지 확인
		// 만약 지정된 시간이 지나지 않으면 종료, 즉 아직 쿠키가 존재하는 경우
		if (Cookie.getCookie('PwaInstalled')) return;

		// 사파리일 경우
		if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
			if (isMobile) {
				setInstallCb(() => {
					return () => router.push('/pwa#sios');
				});
			} else {
				setInstallCb(() => {
					return () => router.push('/pwa#spc');
				});
			}
		} else {
			// 크롬
			if (isMobile) {
				setInstallCb(() => {
					return () => router.push('/pwa#cand');
				});
			} else {
				setInstallCb(() => {
					return () => router.push('/pwa#cpc');
				});
			}
		}

		if (
			!isInStandaloneMode &&
			localStorage.getItem('PwaInstalled') === null &&
			isMobile
		) {
			Cookie.setCookie('PwaInstalled', '1', { 'max-age': 60 * 60 * 6 });
		} else if (
			!isInStandaloneMode &&
			localStorage.getItem('PwaInstalled') === null &&
			!isMobile
		) {
			Cookie.setCookie('PwaInstalled', '1', { 'max-age': 60 * 60 * 24 });
		}

		setTimeout(
			() => {
				setIsOpen(true);
			},
			60 * 2 * 1000
		);
		// 웹인데 pc인경우 하루마다 설치하라 해야함.
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		if (isOpen) {
			document.querySelector('main')!.style.overflowY = 'hidden';
		}
		return () => {
			document.querySelector('main')!.style.overflowY = 'auto';
		};
		// eslint-disable-next-line
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<section
			className={`fixed top-0 z-[99999999] flex h-full w-full flex-col justify-end backdrop-blur-sm md:absolute md:h-dvh ${interFont.className} overflow-hidden`}
		>
			<form
				onSubmit={(e) => e.preventDefault()}
				className={`mx-auto block w-full rounded-t-2xl bg-h_light_black px-8 py-10 transition-transform duration-700 md:w-3/4 ${isMounting ? 'translate-y-0' : 'translate-y-full'}`}
			>
				<div className="text-center">
					<p className="mb-6 text-3xl font-bold">
						{'🔔 앱으로 사용해보세요! 🔔'}
					</p>
					<p className="break-keep text-xl">
						{'웹에서 설치 가능해요! 간편하게 사용해보세요!'}
					</p>
					<p>{'설치 방법은 간단해요!'}</p>
				</div>
				<Button
					className="my-4 w-full py-3 text-2xl"
					isLoading={false}
					onClick={() => installCb()}
				>
					앱 설치하러 가기
				</Button>

				<Button
					className="w-full bg-h_light_black py-3 text-2xl"
					onClick={() => setIsMounting(false)}
				>
					생각 좀 해볼게
				</Button>
			</form>
		</section>,
		document.querySelector('#time-portal')!
	);
}
