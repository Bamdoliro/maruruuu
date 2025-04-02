import type { NoticeDetail, NoticeList } from './client';

export interface NoticeListRes {
  dataList: NoticeList[];
}

export interface NoticeDetailRes {
  data: NoticeDetail;
}
