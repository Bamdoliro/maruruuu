import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import {
  GetNoticeListRes,
  getNoticeDetailRes,
  PostNoticeReq,
} from '@/types/notice/remote';

export const getNoticeList = async () => {
  const { data } = await maru.get<GetNoticeListRes>('/notice');

  return data;
};

export const getNoticeDetail = async (noticeId: number) => {
  const { data } = await maru.get<getNoticeDetailRes>(`/notice/${noticeId}`);

  return data;
};

export const postNotice = async (params: PostNoticeReq) => {
  const { data } = await maru.post('/notice', { params }, authorization());
  return data;
};

export const deleteNotice = async (noticeId: number) => {
  const { data } = await maru.delete(`/notice/${noticeId}`, authorization());

  return data;
};
