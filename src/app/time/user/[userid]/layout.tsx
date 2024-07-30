import OtherUserSelectedDateContextProvider from '@/context/OtherUserTimeContext';
import { PropsWithChildren } from 'react';

export default function UserTimelayout({ children }: PropsWithChildren) {
	return (
		<OtherUserSelectedDateContextProvider>
			{children}
		</OtherUserSelectedDateContextProvider>
	);
}
