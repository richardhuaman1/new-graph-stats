'use client'

import {WebGraph} from "@/components/web-graph";
import {Loader} from "@/components/spinner";
import {useEffect, useState} from "react";
import {ResponseDataInit} from "@/context/socket.interface";
import {useSocket} from "@/context/socketContext";
import {useSendMessage} from "@/hooks/useSendMessage";
import useSocketEvent from "@/hooks/useSocketEvent";
import {GraphStatsStore} from "@/stores/graph-stats.store";
import {isArray} from "@/utilities/validation";

export default function IndexPage() {

    const [status, setStatus] = useState<'idle' | 'completed' | 'error'>('idle')

    const setScore = GraphStatsStore.useSetScore()
    const setOtherMarkets = GraphStatsStore.useSetOtherMarkets()

    const socket = useSocket();
    const {sendMessage} = useSendMessage();


    useEffect(() => {
        if (!socket) return;
        socket.once("connect", () => {
            sendMessage("send-data");
        });
    }, [socket, sendMessage]);

    useSocketEvent("init", (response) => {
        if (!isArray(response.data) || response.data.length === 0) {
            setStatus('error')
            return
        }

        Promise.all([
            setScore(response.data[0]),
            setOtherMarkets([response.data[1], response.data[2]])
        ]).then(() => {
            setStatus('completed');
        })


    });

    useSocketEvent("emit", (data) => {
        console.log({data})
    });

    if (status === 'idle') return <Loader/>

    if (status === 'error') return <div className={'text-white'}>Ha ocurrido un error!</div>

    return <WebGraph/>

}


