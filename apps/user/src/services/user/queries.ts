import { KEY } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import { getUser } from './api';
import { useAuthState } from '@maru/hooks';

export const useUserQuery = () => {
  const { isLoggedIn } = useAuthState();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.USER],
    queryFn: getUser,
    enabled: isLoggedIn,
    staleTime: Infinity,
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};
