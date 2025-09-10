import { useEffect, useCallback } from 'react';
import { useSocket } from '@/context/socketContext';
import {GraphStat, RefreshedSelection, SocketResponse} from "@/types";

type EventType = 'init' | 'emit';

type EventDtoMap = {
    init: SocketResponse<GraphStat[]>;
    emit: RefreshedSelection[][];
};

const useSocketEvent = <K extends EventType>(
    event: K,
    onEventReceived: (dataSocket: EventDtoMap[K]) => void
) => {
    const socket = useSocket();

    const handleEvent = useCallback(
        (data: EventDtoMap[K]) => {
            try {
                onEventReceived(data);
            } catch (error) {
                // console.error('❌ Error procesando evento', error);
            }
        },
        [onEventReceived]
    );
    useEffect(() => {
        if (!socket) return;

        socket.on(event, handleEvent as any);
        return () => {
            socket.off(event, handleEvent as any);
        };
    }, [socket, event, handleEvent]);
};

export default useSocketEvent;
