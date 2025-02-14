'use client';

import {
  QueryClientProvider as MaruQueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface PropsType {
  children: ReactNode;
}

const QueryClientProvider = ({ children }: PropsType) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <MaruQueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </MaruQueryClientProvider>
  );
};

export default QueryClientProvider;
