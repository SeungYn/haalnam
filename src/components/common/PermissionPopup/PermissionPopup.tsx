'use client';

import { interFont } from '@/fonts';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';
import service from '@/service/client';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type Props = {
	confirmCb: () => void;
	cancelCb: () => void;
	title?: string;
	body?: string;
	additionalDescription?: string;
};

// 사용자가 계획 페이지를 오면
// 웹 푸시 알림 권한 체크를 해야함 > 팝업을 띄움
export default function PermissionPopup({
	title,
	body,
	additionalDescription,
	confirmCb,
	cancelCb,
}: Props) {
	const { data } = useSession();
	const { isMounting, isOpen, setIsOpen, setIsMounting } = usePopUpStatus();
	const [isSubscribeLoading, setIsSubscribeLoading] = useState(false);
	const router = useRouter();
	const subscribeUserToNotifications = () => {
		// 사용자가 알림을 해 놓아도 기기가 바뀌면 다시 등록을 해야함
		// 사용자가 시스템에서 알림을 거부에서 허용으로 바꿨을 때
		setIsSubscribeLoading(true);
		window.Notification?.requestPermission().then((permission) => {
			if (permission === 'granted') {
				var subscribeOptions = {
					userVisibleOnly: true,
					applicationServerKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
				};
				navigator.serviceWorker.ready
					.then((registration) =>
						registration.pushManager.subscribe(subscribeOptions)
					)
					.then((subscription) => {
						return service.webPush
							.postCreateSubscription({
								subscriptionInfo: JSON.stringify(subscription),
								endpoint: subscription.endpoint,
							})
							.then((r) => {
								toast.success('알림 등록 완료!');
								localStorage.setItem('alarmPermission', '1');
								setIsSubscribeLoading(false);
								setIsMounting(false);
							});
					})
					.then(() => console.log('완완료'));
			}
		});
	};

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

	// 계획 페이지 오면 알림 권한 확인

	useEffect(() => {
		if (!data) return;

		if (
			localStorage.getItem('alarmPermission') &&
			Notification.permission === 'granted'
		)
			return;
		// 어느 기기에서 사용자가 알림을 허용을 했는데 다른 기기에서는 알림이 허용 안 돼었을 경우
		// 시스템으로 허용했을 경우도 포함
		// 이경우 백그라운드에서 등록
		if (Notification.permission === 'granted') {
			Notification.requestPermission().then((permission) => {
				if (permission === 'granted') {
					var subscribeOptions = {
						userVisibleOnly: true,
						applicationServerKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
					};
					navigator.serviceWorker.ready
						.then((registration) =>
							registration.pushManager.subscribe(subscribeOptions)
						)
						.then((subscription) => {
							return service.webPush.postCreateSubscription({
								subscriptionInfo: JSON.stringify(subscription),
								endpoint: subscription.endpoint,
							});
						});
				}
			});
			return;
		}

		// 위 조건이 아닐경우 팝업 오픈
		setTimeout(() => {
			setIsOpen(true);
		}, 3000);
		// eslint-disable-next-line
	}, [data]);

	// 부모는
	if (!isOpen) return null;

	return createPortal(
		<section
			className={`md:h-dvh fixed top-0 z-[99999999] flex h-screen w-full flex-col justify-end backdrop-blur-sm md:absolute ${interFont.className}`}
		>
			<form
				onSubmit={(e) => e.preventDefault()}
				className={`mx-auto block w-full rounded-t-2xl bg-h_light_black px-8 py-10 transition-all duration-700 md:w-3/4 ${isMounting ? 'translate-y-0' : 'translate-y-full'}`}
			>
				<div className="text-center">
					<p className="mb-8 text-3xl font-bold">{title}</p>
					<p className="break-keep text-xl">{body}</p>
					<p>{additionalDescription}</p>
				</div>
				{window.Notification?.permission === 'default' ? (
					<Button
						className="my-4 w-full py-3 text-2xl"
						isLoading={isSubscribeLoading}
						onClick={() => subscribeUserToNotifications()}
					>
						응 보내줘!
					</Button>
				) : (
					<Button
						className="my-4 w-full py-3 text-2xl"
						isLoading={isSubscribeLoading}
						onClick={() => router.push('/alarm')}
					>
						알림 설정하러 가기
					</Button>
				)}
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

export const PermissionPopupContainer = () => {
	return (
		<PermissionPopup
			confirmCb={() => {}}
			cancelCb={() => {}}
			title="🔔 계획표 알림을 보내드릴까요? 🔔"
			body="알림을 권한을 수락하시면 메인으로 등록된 계획표 시간에 알림을
						보내드려요!"
			additionalDescription="(알림을 거부하시면 재등록시 번거로우실 수 있어요 🥲)"
		/>
	);
};
