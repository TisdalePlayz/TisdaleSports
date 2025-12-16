'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@/components/ThemeProvider';
import { NotificationProvider } from '@/components/NotificationProvider';
import { WebSocketProvider } from '@/components/WebSocketProvider';
import { AutoUpdater } from '@/components/AutoUpdater';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000, // 30 seconds
        refetchInterval: 30 * 1000, // 30 seconds
        refetchOnWindowFocus: false,
        retry: 3,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NotificationProvider>
          <WebSocketProvider>
            <AutoUpdater>
              {children}
            </AutoUpdater>
          </WebSocketProvider>
        </NotificationProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}