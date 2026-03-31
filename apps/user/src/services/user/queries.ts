import { KEY } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import { getUser } from './api';

export const useUserQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.USER],
    queryFn: getUser,
    enabled: !!localStorage.getItem('isLoggedIn'),
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};
