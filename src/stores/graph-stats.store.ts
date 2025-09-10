import {create} from 'zustand';
import {GraphStat} from "@/types";
import {GraphStatsEmptyState} from "@/constants";

interface State {
    score: GraphStat;
    otherMarkets: GraphStat[];
}

interface Actions {
    setScore: (stats: GraphStat) => void;
    setOtherMarkets: (stats: GraphStat[]) => void;
}

const initialState: State = {
    score: GraphStatsEmptyState,
    otherMarkets: []
};

const useGraphStatsStore = create<State & Actions>()(set => {
    return {
        ...initialState,
        setScore: (stats) => set(() => ({score: stats})),
        setOtherMarkets: (stats) => set(() => ({otherMarkets: stats})),
    };
});

export const GraphStatsStore = {
    useGetScore: () => useGraphStatsStore(state => state.score),
    useSetScore: () => useGraphStatsStore(state => state.setScore),
    useGetOtherMarkets: () => useGraphStatsStore(state => state.otherMarkets),
    useSetOtherMarkets: () => useGraphStatsStore(state => state.setOtherMarkets),
}

