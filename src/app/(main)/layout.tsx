import Sidebar from '@/components/common/Sidebar';
import './globals.css';
import type { Metadata } from 'next';
//import { Inter } from 'next/font/google';
import { sincerity } from '@/fonts';
import { AuthContext } from '@/context';
import ReactQueryContext from '@/context/ReactQueryContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TimeContextProvider from '@/context/TimeContext';
import CheckUnloadHOC from '@/hoc/CheckUnloadHOC';
import ReactToastContainer from '@/components/common/toast/ReactToastContainer';
import 'react-toastify/dist/ReactToastify.min.css';
import { whereHost } from '@/utils/util';
import PopupStandard from '@/components/common/PopupStandard/PopupStandard';
import DialogContextProvider from '@/context/DialogContext';
import BasicLoading from '@/components/common/loading/BasicLoading';
import ServiceWorkerRegisterHoc from '@/hoc/ServiceWorkerRegisterHoc';

import dynamic from 'next/dynamic';

const PWAInstallPrompt = dynamic(
	() => import('@/components/common/pwa/PWAInstallPrompt'),
	{ ssr: false }
);

export const metadata: Metadata = {
	metadataBase: new URL(whereHost() || ''),
	title: {
		template: '하얼남 | %s',
		default: '하얼남 | 홈',
	},
	description: '간편하게 시간을 기록하세요',
	keywords: '타이머, 시간관리, 시간측정, 남은시간, 하얼남',
	openGraph: {
		title: '하얼남 - 하루를 기록하다.',
		description: '간편하게 시간을 기록하세요',
		siteName: '하얼남',
		images: '/og/thumbnail.jpg',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko" className={sincerity.className}>
			<ReactQueryContext>
				<AuthContext>
					<ServiceWorkerRegisterHoc>
						<TimeContextProvider>
							{/* <CheckUnloadHOC> */}
							<body>
								<PWAInstallPrompt />
								<BasicLoading />
								<DialogContextProvider>
									<div className="flex h-full w-full flex-col-reverse bg-h_black text-white md:flex-row">
										<Sidebar />
										<main className="relative flex-1 overflow-y-auto overflow-x-hidden md:px-4">
											{/* 팝업 기준 요소 */}
											<PopupStandard />
											<div className="mx-auto h-full min-h-full w-full max-w-screen-xl px-4 md:px-0">
												{children}
											</div>
										</main>
									</div>
									<ReactToastContainer />
									<ReactQueryDevtools />
								</DialogContextProvider>
							</body>
							{/* </CheckUnloadHOC> */}
						</TimeContextProvider>
					</ServiceWorkerRegisterHoc>
				</AuthContext>
			</ReactQueryContext>
		</html>
	);
}
