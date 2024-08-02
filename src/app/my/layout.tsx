import AuthGuarder from '@/hoc/AuthGuarder';
import { PropsWithChildren } from 'react';

export default function Mylayout({ children }: PropsWithChildren) {
	return <AuthGuarder>{children}</AuthGuarder>;
}
