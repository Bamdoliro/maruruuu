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

export const useNoticeDetailQuery = (noticeId: number) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.NOTICE_DETAIL, noticeId],
    queryFn: () => getNoticeDetail(noticeId),
  });

  return { data: data?.data, ...restQuery };
};
