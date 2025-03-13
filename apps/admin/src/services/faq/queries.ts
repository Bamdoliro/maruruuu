import { KEY } from '@/constants/common/constant';
import { useQuery } from '@tanstack/react-query';
import { getFaqList } from './api';
import { FaqCategory } from '@/types/faq/client';

export const useFaqListQuery = (category: FaqCategory) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FAQ_LIST],
    queryFn: () => getFaqList(category),
  });

  return { data: data?.dataList, ...restQuery };
};
