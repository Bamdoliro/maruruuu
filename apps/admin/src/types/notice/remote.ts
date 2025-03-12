import type { Notice, NoticeDetail, NoticeFileData } from './client';

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

export interface PutNoticeReq {
  title: string;
  content: string;
  fileNameList?: Array<string> | null;
}

export interface PostNoticeFileReq {
  fileName: string;
  mediaType: string;
  fileSize: number;
}

export interface PostNoticeFileRes {
  dataList: NoticeFileData[];
}
