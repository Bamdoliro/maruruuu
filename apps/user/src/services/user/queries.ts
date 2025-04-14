import { KEY, TOKEN } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import { getUser } from './api';
import { Cookie } from '@/apis/cookie/cookie';

export const useUserQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.USER],
    queryFn: getUser,
    enabled: !!Cookie.getItem(TOKEN.ACCESS),
  });

  return { data: data?.data, ...restQuery };
};
