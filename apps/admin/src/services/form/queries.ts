import { KEY } from '@/constants/common/constant';
import { getFormList } from './api';
import { useQuery } from '@tanstack/react-query';
import {
  useFormListSortingTypeValueStore,
  useFormListTypeValueStore,
} from '@/store/form/formType';

export const useFormListQuery = () => {
  const formListType = useFormListTypeValueStore();
  const formListSortingType = useFormListSortingTypeValueStore();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_LIST, formListType, formListSortingType],
    queryFn: () => getFormList(formListType, formListSortingType),
  });

  return { data: data?.dataList, ...restQuery };
};
