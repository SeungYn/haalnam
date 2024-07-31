import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const sincerity = localFont({
	src: './Sincerity.ttf',
	variable: '--font-sincVariable',
	display: 'swap',
});

export const interFont = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});
