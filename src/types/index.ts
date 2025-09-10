export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
}

export type Market = {
    markettype: string;
    marketname: string;
    marketEq: string;
}

export type Selection = {
    selectionname: string;
    selectionnameEq: string;
    count: string;
    quota: string;
    percentage: string;
    color: string;
    background: string;
}

export type GraphStat = {
    market: Market;
    selections: Selection[];
}

export type SocketResponse = {
    message: string;
    data: GraphStat[];
}
