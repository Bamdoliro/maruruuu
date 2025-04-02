import { maru } from '@/apis/instance/instance';
import type { NoticeDetailRes, NoticeListRes } from '@/types/notice/remote';

export const getAllNoticeList = async () => {
  const { data } = await maru.get<NoticeListRes>('/notices');

  return data;
};

export const getNoticeDetail = async (id: number) => {
  const { data } = await maru.get<NoticeDetailRes>(`/notices/${id}`);

  return data;
};
