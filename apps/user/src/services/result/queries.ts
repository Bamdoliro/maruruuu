import { KEY, SCHEDULE, TOKEN } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import { getAdmissionTicket, getFinalResult, getFirstResult } from './api';
import { Storage } from '@/apis/storage/storage';
import dayjs from 'dayjs';

export const useFirstResultQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FIRST_RESULT] as const,
    queryFn: getFirstResult,
    enabled: !!Storage.getItem(TOKEN.ACCESS),
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};

export const useFinalResultQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FINAL_RESULT] as const,
    queryFn: getFinalResult,
    enabled: !!Storage.getItem(TOKEN.ACCESS),
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};

export const useDownloadAdmissionTicketQuery = () => {
  const day = dayjs();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.ADMISSION_TICKET] as const,
    queryFn: getAdmissionTicket,
    enabled:
      !!Storage.getItem(TOKEN.ACCESS) &&
      day.isBetween(SCHEDULE.일차_합격_발표, SCHEDULE.이차_면접),
    retry: false,
  });

  return { data, ...restQuery };
};
