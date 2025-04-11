import type { FairData, FairDetailData, FairFormData } from './client';

export interface GetFairListRes {
  dataList: FairData[];
}

export interface GetFairDetailRes {
  data: FairDetailData;
}

export interface PostFairDetail {
  data: FairFormData;
}
