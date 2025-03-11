import type { Notice, NoticeDetail } from './client';

export interface GetNoticeListRes {
  dataList: Notice[];
}

export interface getNoticeDetailRes {
  data: NoticeDetail;
}
