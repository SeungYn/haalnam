import { QueryCache, QueryClientConfig } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

export const queryConfig: QueryClientConfig = {
	queryCache: new QueryCache({
		onError: (error: unknown) => {
			if (isReactQueryError(error)) {
				signOut();
			}
			return;
		},
	}),
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

function isReactQueryError(error: unknown): error is ReactQueryError {
	return typeof error === 'object' && error !== null && 'status' in error;
}
