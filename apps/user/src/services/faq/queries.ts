import { useSuspenseQuery } from '@tanstack/react-query';
import { KEY } from '@/constants/common/constants';
import { getFaqList } from './api';

export const useFaqListQuery = (category: string) => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [KEY.FAQ_LIST, category] as const,
    queryFn: () => getFaqList(category),
  });

  return { data: data.dataList, ...restQuery };
};
