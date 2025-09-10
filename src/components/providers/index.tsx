'use client'

import {PropsWithChildren} from "react";
import QueryProvider from "@/components/providers/query-client.provider";
import { SocketProvider } from '@/context/socketContext';

export function Providers({children}: PropsWithChildren) {
    return (
        <SocketProvider>
            <QueryProvider>{children}</QueryProvider>
        </SocketProvider>
    )
}