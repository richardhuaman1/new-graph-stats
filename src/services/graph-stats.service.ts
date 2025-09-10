import {apiClient} from "@/libs/api-client";
import {ApiResponse, GraphStats} from "@/types";

export class GraphStatsService {
    async getGraphStats() {
        try {
            const response = await apiClient.get<ApiResponse<GraphStats[]>>('/v1/markets');
            const {data} = response.data;
            return data
        } catch (err: any) {
            // console.error(err);
            throw new Error(err)
        }
    }
}