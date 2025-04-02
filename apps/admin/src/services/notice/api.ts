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
  const { data } = await maru.get<GetNoticeListRes>('/notices');

  return data;
};

export const getNoticeDetail = async (id: number) => {
  const { data } = await maru.get<getNoticeDetailRes>(`/notices/${id}`);

  return data;
};

export const postNotice = async (params: PostNoticeReq) => {
  const { data } = await maru.post('/notices', params, authorization());

  return data;
};

export const postNoticeFile = async (params: PostNoticeFileReq[]) => {
  const data = await maru.post<PostNoticeFileRes>(
    '/notices/files',
    params,
    authorization()
  );
  const dataList = data.data.dataList;

  return dataList;
};

export const putNotice = async (id: number, params: PutNoticeReq) => {
  const { data } = await maru.put(`/notices/${id}`, params, authorization());

  return { data };
};

export const putNoticeFileUrl = async (files: File[], fileDatas: NoticeFileData[]) => {
  const uploadPromises = files.map((file, index) => {
    const { url } = fileDatas[index];

    return axios.put(url.uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  });

  const data = await Promise.all(uploadPromises);

  return data;
};

export const deleteNotice = async (id: number) => {
  const { data } = await maru.delete(`/notices/${id}`, authorization());

  return data;
};
