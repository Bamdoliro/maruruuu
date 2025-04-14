import { KEY, TOKEN } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import {
  getExportForm,
  getExportRecipt,
  getFormStatus,
  getSaveForm,
  getSchoolList,
} from './api';
import { Cookie } from '@/apis/cookie/cookie';

export const useFormStatusQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_STATUS],
    queryFn: getFormStatus,
    enabled: !!Cookie.getItem(TOKEN.ACCESS),
    retry: 1,
  });

  return { data: data?.data, ...restQuery };
};

export const useExportFormQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.EXPORT_FORM],
    queryFn: getExportForm,
    retry: 1,
  });

  return { data, ...restQuery };
};

export const useExportReciptQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.EXPORT_RECEIPT],
    queryFn: getExportRecipt,
    retry: 1,
  });

  return { data, ...restQuery };
};

export const useSaveFormQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SAVE_FORM],
    queryFn: getSaveForm,
    enabled: !!Cookie.getItem(TOKEN.ACCESS),
    retry: 1,
  });

  return { data: data?.data, ...restQuery };
};

export const useSchoolListQuery = (school: string) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SCHOOL_LIST, school],
    queryFn: () => getSchoolList(school),
  });

  return { data: data?.dataList, ...restQuery };
};
