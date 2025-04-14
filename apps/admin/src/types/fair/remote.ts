import type { FairData, FairDetailData } from './client';

export interface GetFairListRes {
  dataList: FairData[];
}

export interface GetFairDetailRes {
  data: FairDetailData;
}
