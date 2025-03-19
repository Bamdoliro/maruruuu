import { KEY } from '@/constants/common/constant';
import { useQuery } from '@tanstack/react-query';
import { getFairList } from './api';

export const useFairListQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FAIR_LIST],
    queryFn: getFairList,
  });

  return { data: data?.dataList, ...restQuery };
};
