import {useQuery} from "@tanstack/react-query";
import {GraphStatsService} from "@/services/graph-stats.service";
import {keepPreviousData} from "@tanstack/query-core";

export const graphStatsKeys = {
    all: ['graph-stats'] as const,
    getGraphStats: () => [...graphStatsKeys.all, 'stats'] as const,
}

export const GraphStatsQuery = {
    useGetGraphStats: () => {
        return useQuery({
            queryFn: new GraphStatsService().getGraphStats,
            queryKey: graphStatsKeys.getGraphStats(),
            //placeholderData: keepPreviousData
        })
    }
}
