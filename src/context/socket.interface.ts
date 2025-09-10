interface Selection {
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

interface Market {
  markettype: string;
  marketname: string;
  marketEq: string;
}

interface DataItem {
  position: number;
  markets: Market;
  selections: Selection[];
}

export interface ResponseDataInit {
  message: string;
  data: DataItem[];
}
