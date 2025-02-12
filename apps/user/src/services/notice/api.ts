import { maru } from '@/apis/instance/instance';
import { NoticeDetailRes, NoticeListRes } from '@/types/notice/remote';

export const getAllNoticeList = async () => {
  const { data } = await maru.get<NoticeListRes>('/notice');

  return data;
};

export const getNoticeDetail = async (id: number) => {
  const { data } = await maru.get<NoticeDetailRes>(`/notice/${id}`);

  return data;
};
