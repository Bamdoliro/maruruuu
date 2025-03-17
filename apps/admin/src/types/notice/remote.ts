import type { Notice, NoticeData, NoticeDetail, NoticeFileData } from './client';

export interface GetNoticeListRes {
  dataList: Notice[];
}

export interface getNoticeDetailRes {
  data: NoticeDetail;
}

export type PostNoticeReq = NoticeData;

export type PutNoticeReq = NoticeData;

export interface PostNoticeFileReq {
  fileName: string;
  mediaType: string;
  fileSize: number;
}

export interface PostNoticeFileRes {
  dataList: NoticeFileData[];
}
