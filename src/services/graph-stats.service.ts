import {apiClient} from "@/libs/api-client";
import {ApiResponse, GraphStat} from "@/types";

export class GraphStatsService {
    async getGraphStats() {
        try {
            const response = await apiClient.get<ApiResponse<GraphStat[]>>('/v1/markets');
            const {data} = response.data;
            return data
        } catch (err: any) {
            // console.error(err);
            throw new Error(err)
        }
    }
}