import { KEY } from '@/constants/common/constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getFairList } from './api';

export const useFairListQuery = (fairType?: string) => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [KEY.FAIR_LIST, fairType],
    queryFn: () => getFairList(fairType),
  });

  return { data: data.dataList, ...restQuery };
};
