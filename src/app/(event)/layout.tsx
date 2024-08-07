import { interFont } from '@/fonts';
import './event-globals.css';

export const metadata = {
	title: 'Next.js',
	description: 'Generated by Next.js',
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
