import type { Notice, NoticeInput, NoticeDetail, NoticeFileData } from './client';

export interface GetNoticeListRes {
  dataList: Notice[];
}

export interface getNoticeDetailRes {
  data: NoticeDetail;
}

export type PostNoticeReq = NoticeInput;

export type PutNoticeReq = NoticeInput;

export interface PostNoticeFileReq {
  fileName: string;
  mediaType: string;
  fileSize: number;
}

export interface PostNoticeFileRes {
  dataList: NoticeFileData[];
}
