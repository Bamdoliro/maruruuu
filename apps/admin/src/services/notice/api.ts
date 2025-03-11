import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { GetNoticeListRes, getNoticeDetailRes } from '@/types/notice/remote';

export const getNoticeList = async () => {
  const { data } = await maru.get<GetNoticeListRes>('/notice');

  return data;
};

export const getNoticeDetail = async (noticeId: number) => {
  const { data } = await maru.get<getNoticeDetailRes>(`/notice/${noticeId}`);

  return data;
};
