import { KEY } from '@/constants/common/constant';
import { useQuery } from '@tanstack/react-query';
import { getFaq, getFaqList } from './api';
import { FaqCategory } from '@/types/faq/client';

export const useFaqListQuery = (category: FaqCategory) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FAQ_LIST],
    queryFn: () => getFaqList(category),
  });

  return { data: data?.dataList, ...restQuery };
};

export const useFaqQuery = (id: number) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FAQ_DETAIL],
    queryFn: () => getFaq(id),
  });

  return { data: data, ...restQuery };
};
