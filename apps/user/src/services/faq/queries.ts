import { useQuery } from '@tanstack/react-query';
import { KEY } from '@/constants/common/constants';
import { getFaqList } from './api';

export const useFaqListQuery = (category: string) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FAQ_LIST, category] as const,
    queryFn: () => getFaqList(category),
    retry: false,
  });

  return { data: data?.dataList, ...restQuery };
};
