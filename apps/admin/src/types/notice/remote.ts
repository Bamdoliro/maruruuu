import type { Notice, NoticeDetail } from './client';

export interface GetNoticeListRes {
  dataList: Notice[];
}

export interface getNoticeDetailRes {
  data: NoticeDetail;
}

export interface PostNoticeReq {
  title: string;
  content: string;
  fileNameList?: Array<string> | null;
}
