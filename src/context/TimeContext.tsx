'use client';

import { Status } from '@prisma/client';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react';

type TimeContextType = {
  startTime: Date | undefined;
  status: Status;
  subject: string;
};

type TimeActionContextType = {
  handleStatusToggle: () => void;
  startTime: (startTime: Date, subject: string) => void;
};

type TimeContextAction =
  | { type: 'status'; payload: Status }
  | { type: 'startTime'; payload: Date | undefined }
  | { type: 'subject'; payload: string }
  | { type: 'all'; payload: TimeContextType };

const initialTimeContext: TimeContextType = {
  status: 'END',
  startTime: undefined,
  subject: '',
};

const TimeContext = createContext<TimeContextType>(initialTimeContext);

const TimeActionContext = createContext<TimeActionContextType>({
  handleStatusToggle: () => {},
  startTime: (startTime, subject) => {},
});

function timeContextReducer(state: TimeContextType, action: TimeContextAction) {
  switch (action.type) {
    case 'status':
      return { ...state, status: action.payload };
    case 'subject':
      return { ...state, subject: action.payload };
    case 'startTime':
      return { ...state, startTime: action.payload };
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

  const startTime = useCallback((startTime: Date, subject: string) => {
    dispatch({ type: 'all', payload: { subject, startTime, status: 'START' } });
  }, []);

  return (
    <TimeContext.Provider value={state}>
      <TimeActionContext.Provider value={{ handleStatusToggle, startTime }}>
        {children}
      </TimeActionContext.Provider>
    </TimeContext.Provider>
  );
}

export const useTimeContext = () => useContext(TimeContext);
export const useTimeActionContext = () => useContext(TimeActionContext);
