import { getAllNoticeList, getNoticeDetail } from './api';
import { KEY } from '@/constants/common/constants';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useNoticeListQuery = () => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [KEY.NOTICE_LIST] as const,
    queryFn: getAllNoticeList,
    select: (data) => ({
      ...data,
      dataList: data.dataList.sort(
        (a, b) => new Date(b.updatedAt).getDate() - new Date(a.updatedAt).getDate()
      ),
    }),
  });

  return { data: data.dataList, ...restQuery };
};

export const useNoticeDetailQuery = (id: number) => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [KEY.NOTICE_DETAIL] as const,
    queryFn: () => getNoticeDetail(id),
  });

  return { data: data.data, ...restQuery };
};
