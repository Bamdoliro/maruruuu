import { KEY } from '@/constants/common/constant';
import { useQuery } from '@tanstack/react-query';
import { getNoticeDetail, getNoticeList } from './api';

export const useNoticeListQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.NOTICE_LIST],
    queryFn: getNoticeList,
  });

  return { data: data?.dataList, ...restQuery };
};

export const useNoticeDetailQuery = (id: number) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.NOTICE_DETAIL, id],
    queryFn: () => getNoticeDetail(id),
  });

  return { data: data?.data, ...restQuery };
};
