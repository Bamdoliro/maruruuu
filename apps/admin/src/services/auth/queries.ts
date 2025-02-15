import { KEY } from '@/constants/common/constant';
import { useQuery } from '@tanstack/react-query';
import { getCheckLogin } from './api';

export const useLoginCheckQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.LOGIN_CHECK],
    queryFn: getCheckLogin,
  });
  return { data, ...restQuery };
};
