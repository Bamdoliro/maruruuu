import { Faq, FaqCategory } from './client';

export interface GetFaqListRes {
  dataList: Faq[];
}

export interface GetFaqDetailRes {
  data: Faq;
}

export interface PostFaqReq {
  title: string;
  content: string;
  category: FaqCategory;
}

export interface PutFaqReq {
  title: string;
  content: string;
  category: FaqCategory;
}
