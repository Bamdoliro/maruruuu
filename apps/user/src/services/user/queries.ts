import { KEY, TOKEN } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import { getUser } from './api';
import { Storage } from '@/apis/storage/storage';

export const useUserQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.USER],
    queryFn: getUser,
    enabled: !!Storage.getItem(TOKEN.ACCESS),
  });

  return { data: data?.data, ...restQuery };
};
