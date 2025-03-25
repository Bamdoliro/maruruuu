import { Faq, FaqCategory, FaqInput } from './client';

export interface GetFaqListRes {
  dataList: Faq[];
}

export interface GetFaqDetailRes {
  data: Faq;
}

export type PostFaqReq = FaqInput;

export type PutFaqReq = FaqInput;
