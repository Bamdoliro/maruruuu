import { KEY } from '@/constants/common/constant';
import { useQuery } from '@tanstack/react-query';
import { getFaqDetail, getFaqList } from './api';

export const useFaqListQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FAQ_LIST],
    queryFn: getFaqList,
    select: (response) => ({
      ...response,
      dataList: (response.dataList ?? []).sort((a, b) => a.id - b.id),
    }),
  });

  return { data: data?.dataList, ...restQuery };
};

export const useFaqDetailQuery = (id: number) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FAQ_DETAIL],
    queryFn: () => getFaqDetail(id),
  });

  return { data: data?.data, ...restQuery };
};
