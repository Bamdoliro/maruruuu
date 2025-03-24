import { KEY } from '@/constants/common/constant';
import { getFormList } from './api';
import { useQuery } from '@tanstack/react-query';

export const useFormListQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_LIST],
    queryFn: getFormList,
  });

  return { data: data?.dataList, ...restQuery };
};
