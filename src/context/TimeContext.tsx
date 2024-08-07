'use client';

import service from '@/service/client';
import { formatBroswerTime } from '@/utils/date';
import { Status } from '@prisma/client';
import { useSession } from 'next-auth/react';
import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react';

export type TimeContextType = {
	startTime: Date | undefined;
	status: Status;
	subject: string;
};

export type TimeActionContextType = {
	handleStatusToggle: () => void;
	handleStartTime: (startTime: Date, subject: string) => void;
	handleEndTime: () => void;
};

type TimeContextAction =
	| { type: 'status'; payload: Status }
	| { type: 'startTime'; payload: Date | undefined }
	| { type: 'subject'; payload: string }
	| { type: 'reset' }
	| { type: 'all'; payload: TimeContextType };

const initialTimeContext: TimeContextType = {
	status: 'END',
	startTime: undefined,
	subject: '',
};

const TimeContext = createContext<TimeContextType>(initialTimeContext);

const TimeActionContext = createContext<TimeActionContextType>({
	handleStatusToggle: () => {},
	handleStartTime: (startTime, subject) => {},
	handleEndTime: () => {},
});

function timeContextReducer(state: TimeContextType, action: TimeContextAction) {
	switch (action.type) {
		case 'status':
			return { ...state, status: action.payload };
		case 'subject':
			return { ...state, subject: action.payload };
		case 'startTime':
			return { ...state, startTime: action.payload };
		case 'reset':
			return { ...initialTimeContext };
		case 'all':
			return { ...action.payload };
		default:
			return { ...state };
	}
}

export default function TimeContextProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(timeContextReducer, initialTimeContext);

	const handleStatusToggle = useCallback(() => {
		if (state.status === 'START') dispatch({ type: 'status', payload: 'END' });
		else dispatch({ type: 'status', payload: 'START' });
	}, []);

	const handleStartTime = useCallback((startTime: Date, subject: string) => {
		dispatch({ type: 'all', payload: { subject, startTime, status: 'START' } });
	}, []);

	const handleEndTime = useCallback(() => {
		dispatch({ type: 'reset' });
	}, []);

	// useEffect(() => {
	// 	// 유저의 타이머 가져오기
	// 	if (!user.data) return;
	// 	service.time.getLatestTime().then((d) => {
	// 		console.log('getTimes', d);
	// 		if (d === null) return;
	// 		if (d.status === 'START') {
	// 			console.log('timer', d);
	// 			handleStartTime(formatBroswerTime(d.time), d.subject);
	// 		}
	// 	});
	// }, []);

	return (
		<TimeContext.Provider value={state}>
			<TimeActionContext.Provider
				value={{ handleStatusToggle, handleStartTime, handleEndTime }}
			>
				{children}
			</TimeActionContext.Provider>
		</TimeContext.Provider>
	);
}

export const useTimeContext = () => useContext(TimeContext);
export const useTimeActionContext = () => useContext(TimeActionContext);
