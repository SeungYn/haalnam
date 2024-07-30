'use client';

// 다른 유저 타이머 선택된 날짜 context

import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useState,
} from 'react';

export type OtherUserSelectedDateContextType = {
	selectedDate: Date;
	setSelectedDate: (d: Date) => void;
};
const initContext = {
	selectedDate: new Date(),
	setSelectedDate: () => {},
};
const OtherUserSelectedDateContext =
	createContext<OtherUserSelectedDateContextType>(initContext);

export default function OtherUserSelectedDateContextProvider({
	children,
}: PropsWithChildren) {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const selectDate = useCallback((d: Date) => {
		setSelectedDate(d);
	}, []);

	return (
		<OtherUserSelectedDateContext.Provider
			value={{ selectedDate, setSelectedDate: selectDate }}
		>
			{children}
		</OtherUserSelectedDateContext.Provider>
	);
}

export function useOtherUserSelectedDateContext() {
	const context = useContext(OtherUserSelectedDateContext);

	return context;
}
