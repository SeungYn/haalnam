import { QueryClientConfig } from 'react-query';

export const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 600000,
      cacheTime: 900000,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
};
