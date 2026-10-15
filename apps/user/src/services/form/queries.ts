import { KEY } from '@/constants/common/constants';
import { useSchedule } from '@/services/schedule/queries';
import { useQuery } from '@tanstack/react-query';
import {
  getExportForm,
  getExportReceipt,
  getFormStatus,
  getSaveForm,
  getSchoolList,
} from './api';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useAuthState } from '@maru/hooks';

dayjs.extend(isBetween);

export const useFormStatusQuery = () => {
  const { isLoggedIn } = useAuthState();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_STATUS],
    queryFn: getFormStatus,
    enabled: isLoggedIn,
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};

export const useExportFormQuery = () => {
  const schedule = useSchedule();
  const day = dayjs();
  const { isLoggedIn } = useAuthState();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.EXPORT_FORM],
    queryFn: getExportForm,
    enabled: isLoggedIn && day.isBetween(schedule.원서_접수, schedule.원서_접수_마감),
    retry: false,
  });

  return { data, ...restQuery };
};

export const useExportReceiptQuery = () => {
  const schedule = useSchedule();
  const day = dayjs();
  const { isLoggedIn } = useAuthState();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.EXPORT_RECEIPT],
    queryFn: getExportReceipt,
    enabled: isLoggedIn && day.isBetween(schedule.원서_접수, schedule.원서_접수_마감),
    retry: false,
  });

  return { data, ...restQuery };
};

export const useSaveFormQuery = () => {
  const { isLoggedIn } = useAuthState();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SAVE_FORM],
    queryFn: getSaveForm,
    enabled: isLoggedIn,
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
