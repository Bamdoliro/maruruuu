import { useQuery } from '@tanstack/react-query';
import { getRegistrationList } from './api';
import { KEY } from '@/constants/common/constant';

export const useRegistrationListQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.REGISTRATION_LIST],
    queryFn: getRegistrationList,
  });

  return { data: data?.dataList, ...restQuery };
};
