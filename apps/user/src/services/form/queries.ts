import { KEY, SCHEDULE, TOKEN } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import {
  getExportForm,
  getExportRecipt,
  getFormStatus,
  getSaveForm,
  getSchoolList,
} from './api';
import { Storage } from '@/apis/storage/storage';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const useFormStatusQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_STATUS],
    queryFn: getFormStatus,
    enabled: !!Storage.getItem(TOKEN.ACCESS),
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};

export const useExportFormQuery = () => {
  const day = dayjs();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.EXPORT_FORM],
    queryFn: getExportForm,
    enabled:
      !!Storage.getItem(TOKEN.ACCESS) &&
      day.isBetween(SCHEDULE.원서_접수, SCHEDULE.원서_접수_마감),
    retry: false,
  });

  return { data, ...restQuery };
};

export const useExportReciptQuery = () => {
  const day = dayjs();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.EXPORT_RECEIPT],
    queryFn: getExportRecipt,
    enabled:
      !!Storage.getItem(TOKEN.ACCESS) &&
      day.isBetween(SCHEDULE.원서_접수, SCHEDULE.원서_접수_마감),
    retry: false,
  });

  return { data, ...restQuery };
};

export const useSaveFormQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SAVE_FORM],
    queryFn: getSaveForm,
    enabled: !!Storage.getItem(TOKEN.ACCESS),
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};

export const useSchoolListQuery = (school: string) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SCHOOL_LIST, school],
    queryFn: () => getSchoolList(school),
    retry: false,
  });

  return { data: data?.dataList, ...restQuery };
};
