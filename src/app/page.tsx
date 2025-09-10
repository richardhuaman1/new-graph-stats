'use client'

import { GraphStatsQuery } from "@/queries/graph-stats.query";
import { WebGraph } from "@/components/web-graph";
import { Loader } from "@/components/spinner";

export default function IndexPage() {
    const graphStatsQuery = GraphStatsQuery.useGetGraphStats();

    if (graphStatsQuery.isPending) return <Loader/>
    if (graphStatsQuery.isError) return <div className={'text-white'}>Ha ocurrido un error</div>

    return <WebGraph data={graphStatsQuery.data}  isLoading={graphStatsQuery.isFetching}/>

}


