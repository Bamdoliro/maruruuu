import { KEY } from '@/constants/common/constant';
import { useQuery } from '@tanstack/react-query';
import { getAdmin } from './api';

export const useAdminQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.ADMIN],
    queryFn: getAdmin,
    enabled: !!localStorage.getItem('isLoggedIn'),
  });
  return { data: data?.data, ...restQuery };
};
