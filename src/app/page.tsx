'use client'

import {WebGraph} from "@/components/web-graph";
import {Loader} from "@/components/spinner";
import {useEffect, useState} from "react";
import {useSocket} from "@/context/socketContext";
import {useSendMessage} from "@/hooks/useSendMessage";
import useSocketEvent from "@/hooks/useSocketEvent";
import {GraphStatsStore} from "@/stores/graph-stats.store";
import {isArray, isEmpty} from "@/utilities/validation";
import {GraphStat} from "@/types";

export default function IndexPage() {

    const [status, setStatus] = useState<'idle' | 'completed' | 'error'>('idle')

    const score = GraphStatsStore.useGetScore()
    const setScore = GraphStatsStore.useSetScore()
    const otherMarkets = GraphStatsStore.useGetOtherMarkets()
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
        if (!isArray(response.data) || isEmpty(response.data)) {
            setStatus('error')
            return
        }

        const [scoreData, ...otherMarketsData] = response.data.sort((a, b) => a.position - b.position);

        Promise.all([
            setScore(scoreData),
            setOtherMarkets(otherMarketsData)
        ]).then(() => {
            setStatus('completed');
        })


    });

    useSocketEvent("emit", (data) => {

        const refreshed = data.flat();

        const updateSelections = (collection: GraphStat): GraphStat => {
            return {
                ...collection,
                selections: collection.selections.map(sel => {
                    const match = refreshed.find(
                        r =>
                            r.selectionname === sel.selectionname &&
                            String(r.markettype) === collection.markets.markettype
                    );

                    return match
                        ? {
                            ...sel,
                            count: match.count,
                            quota: match.quota,
                            percentage: match.percentage
                        }
                        : sel;
                })
            };
        };

        const newOtherMarkets = otherMarkets.map(updateSelections);
        const newScore = updateSelections(score);

        setOtherMarkets(newOtherMarkets);
        setScore(newScore);

    });

    if (status === 'idle') return <Loader/>

    if (status === 'error') return <div className={'text-white'}>Ha ocurrido un error!</div>

    return <WebGraph/>

}


