import AuthGuarder from '@/hoc/AuthGuarder';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
	title: '마이페이지',
};

export default function Mylayout({ children }: PropsWithChildren) {
	return <AuthGuarder>{children}</AuthGuarder>;
}
