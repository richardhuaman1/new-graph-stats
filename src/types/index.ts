export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
}

export type Markets = {
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

export type GraphStats = {
    markets: Markets;
    selections: Selection[];
}