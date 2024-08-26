import AuthGuarder from '@/hoc/AuthGuarder';
import { PropsWithChildren } from 'react';

type Props = {};

export default function layout({ children }: PropsWithChildren<Props>) {
	return (
		<section className="relative flex h-full flex-col items-center gap-4">
			<AuthGuarder>{children}</AuthGuarder>
		</section>
	);
}
