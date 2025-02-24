import { KEY, TOKEN } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import { getFormStatus } from './api';
import { Storage } from '@/apis/storage/storage';

export const useFormStatusQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_STATUS],
    queryFn: getFormStatus,
    enabled: !!Storage.getItem(TOKEN.ACCESS),
    retry: 1,
  });

  return { data: data?.data, ...restQuery };
};
