import { Storage } from '@/apis/storage/storage';
import { KEY, TOKEN } from '@/constants/common/constant';
import { useQuery } from '@tanstack/react-query';
import { getAdmin } from './api';

export const useAdminQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.ADMIN],
    queryFn: getAdmin,
    enabled: !!Storage.getItem(TOKEN.ACCESS),
  });
  return { data: data?.data, ...restQuery };
};
