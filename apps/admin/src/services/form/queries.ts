import { KEY } from '@/constants/common/constant';
import { getFormList, getSecondScoreFormat } from './api';
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

export const useExportSecondScoreFormatQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SECOND_SCORE_FORMAT],
    queryFn: getSecondScoreFormat,
  });

  return { data, ...restQuery };
};
