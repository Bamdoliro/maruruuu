import { Faq, FaqCategory } from './client';

export type GetFaqListReq = FaqCategory;

export interface GetFaqListRes {
  dataList: Faq[];
}

export interface GetFaqRes {
  data: Faq;
}

export interface PostFaqReq {
  title: string;
  content: string;
  category: FaqCategory;
}
