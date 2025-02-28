import { KEY, TOKEN } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import { getExportForm, getExportRecipt, getFormStatus } from './api';
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
