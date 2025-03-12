import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { NoticeFileData } from '@/types/notice/client';
import {
  GetNoticeListRes,
  getNoticeDetailRes,
  PostNoticeReq,
  PutNoticeReq,
  PostNoticeFileReq,
  PostNoticeFileRes,
} from '@/types/notice/remote';
import axios from 'axios';

export const getNoticeList = async () => {
  const { data } = await maru.get<GetNoticeListRes>('/notice');

  return data;
};

export const getNoticeDetail = async (id: number) => {
  const { data } = await maru.get<getNoticeDetailRes>(`/notice/${id}`);

  return data;
};

export const postNotice = async (params: PostNoticeReq) => {
  const { data } = await maru.post('/notice', { params }, authorization());

  return data;
};

export const postNoticeFile = async (params: PostNoticeFileReq) => {
  const data = await maru.post<PostNoticeFileRes>(
    '/notice/file',
    { params },
    authorization()
  );
  const dataList = data.data.dataList;

  return dataList;
};

export const putNotice = async (id: number, params: PutNoticeReq) => {
  const { data } = await maru.put(`/notice/${id}`, { params }, authorization());

  return { data };
};

export const deleteNotice = async (id: number) => {
  const { data } = await maru.delete(`/notice/${id}`, authorization());

  return data;
};
