import { KEY, TOKEN } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import { getAdmissionTicket, getFinalResult, getFirstResult } from './api';
import { Cookie } from '@/apis/cookie/cookie';

export const useFirstResultQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FIRST_RESULT] as const,
    queryFn: getFirstResult,
    enabled: !!Cookie.getItem(TOKEN.ACCESS),
  });

  return { data: data?.data, ...restQuery };
};

export const useFinalResultQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FINAL_RESULT] as const,
    queryFn: getFinalResult,
    enabled: !!Cookie.getItem(TOKEN.ACCESS),
  });

  return { data: data?.data, ...restQuery };
};

export const useDownloadAdmissionTicketQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.ADMISSION_TICKET] as const,
    queryFn: getAdmissionTicket,
    enabled: !!Cookie.getItem(TOKEN.ACCESS),
  });

  return { data, ...restQuery };
};
