import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { GetNoticeListRes } from '@/types/notice/remote';

export const getNoticeList = async () => {
  const { data } = await maru.get<GetNoticeListRes>('/notice');
  return data;
};
