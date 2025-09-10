import type {QueryClientConfig} from '@tanstack/react-query';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from 'react';

interface QueryProviderProps {
    children: React.ReactNode;
}

export default function QueryProvider({children}: QueryProviderProps) {
    const queryClientOptions: QueryClientConfig = {
        defaultOptions: {
            queries: {
                retry: 0,
                refetchOnWindowFocus: false,
            },
        },
    };

    const [queryClient] = useState(new QueryClient(queryClientOptions));
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}