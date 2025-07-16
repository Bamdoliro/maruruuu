import { useQuery } from '@tanstack/react-query';
import { getAllNoticeList, getNoticeDetail } from './api';
import { KEY } from '@/constants/common/constants';

export const useNoticeListQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.NOTICE_LIST] as const,
    queryFn: getAllNoticeList,
    select: (data) => ({
      ...data,
      dataList: data.dataList.sort(
        (a, b) => new Date(b.updatedAt).getDate() - new Date(a.updatedAt).getDate()
      ),
    }),
    retry: false,
  });

  return { data: data?.dataList, ...restQuery };
};

export const useNoticeDetailQuery = (id: number) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.NOTICE_DETAIL, id],
    queryFn: () => getNoticeDetail(id),
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};
