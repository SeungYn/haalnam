'use client';

import { queryConfig } from '@/lib/queryClient';
import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function ReactQueryContext({ children }: PropsWithChildren) {
  const [client, _] = useState(new QueryClient(queryConfig));
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
