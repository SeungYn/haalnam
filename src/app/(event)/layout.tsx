import { interFont } from '@/fonts';
import './event-globals.css';
import { whereHost } from '@/utils/util';
import { Metadata } from 'next';

export const metadata: Metadata = {
	metadataBase: new URL(whereHost() || ''),
	title: {
		template: '하얼남 | %s',
		default: '하얼남 | 소개',
	},
	description: '간편하게 시간을 기록하세요',
	keywords: '타이머, 시간관리, 시간측정, 남은시간, 하얼남',
	openGraph: {
		title: '하얼남 - 하루를 기록하다.',
		description: '간편하게 시간을 기록하세요',
		siteName: '하얼남',
		images: '/og/og-introdue-logo.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="kr" className={interFont.className}>
			<body className="bg-h_black text-white">{children}</body>
		</html>
	);
}
