'use client'

import { useSocket } from "@/context/socketContext";
import { useSendMessage } from "@/hooks/useSendMessage";
import useSocketEvent from "@/hooks/useSocketEvent";
import { useEffect, useState } from "react";
import { DataResponse } from "@/context/socketEmit.interface";
import { ResponseDataInit } from "@/context/socket.interface";

export default function IndexPage() {
    const [dataInit, setDataInit] = useState<ResponseDataInit>({message: '', data: []})
        const socket = useSocket();
        const { sendMessage } = useSendMessage();


        useEffect(() => {
          if (!socket) return;
             socket.once("connect", () => {
                 sendMessage("send-data");
             });
         }, [socket, sendMessage]);
         useSocketEvent("init", (dataSocket: ResponseDataInit) => {
             console.log({dataSocket});
             setDataInit(dataSocket)
         });
         useSocketEvent("emit", (dataSocket: DataResponse) => {
             console.log({dataSocket})
        });


    return <>
    Hola Mundo
    </>
}


