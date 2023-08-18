'use client';

import { Status } from '@prisma/client';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

type TimeContextType = {
  status: Status;
};

type TimeActionContextType = {
  handleStatusToggle: () => void;
};

const TimeContext = createContext<TimeContextType>({ status: 'END' });
const TimeActionContext = createContext<TimeActionContextType>({
  handleStatusToggle: () => {},
});

export default function TimeContextProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<Status>('END');

  const handleStatusToggle = useCallback(() => {
    setStatus((f) => {
      if (f === 'START') return 'END';
      return 'START';
    });
  }, []);

  return (
    <TimeContext.Provider value={{ status }}>
      <TimeActionContext.Provider value={{ handleStatusToggle }}>
        {children}
      </TimeActionContext.Provider>
    </TimeContext.Provider>
  );
}

export const useTimeContext = () => useContext(TimeContext);
export const useTimeActionContext = () => useContext(TimeActionContext);
