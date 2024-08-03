import AuthGuarder from '@/hoc/AuthGuarder';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
	title: '시간표',
};

type Props = {};

export default function layout({ children }: PropsWithChildren<Props>) {
	return (
		<section className="flex h-full flex-col items-center gap-4">
			<AuthGuarder>{children}</AuthGuarder>
		</section>
	);
}
