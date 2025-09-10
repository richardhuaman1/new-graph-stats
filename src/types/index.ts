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
    marketType: string;
    selectionTypeId: string;
    selectiontypeid: string;
    selectionname: string;
    selectionnameEq: string;
    count: string;
    quota: string;
    color: string;
    background: string;
    selectiontype_order: number;
    selectionteam: string;
    _rawPercentage: number;
    percentage: string;
}

export type GraphStat = {
    position: number;
    markets: Market;
    selections: Selection[];
}

export type RefreshedSelection = Pick<Selection, 'selectionname' | 'count' | 'quota' | 'percentage'> & {
    markettype: number;
}

export type SocketResponse<T> = {
    message: string;
    data: T;
}
