import { KEY } from '@/constants/common/constants';
import { useSchedule } from '@/services/schedule/queries';
import { useQuery } from '@tanstack/react-query';
import { getAdmissionTicket, getFinalResult, getFirstResult } from './api';
import dayjs from 'dayjs';
import { useAuthState } from '@maru/hooks';

export const useFirstResultQuery = () => {
  const { isLoggedIn } = useAuthState();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FIRST_RESULT] as const,
    queryFn: getFirstResult,
    enabled: isLoggedIn,
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};

export const useFinalResultQuery = () => {
  const { isLoggedIn } = useAuthState();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FINAL_RESULT] as const,
    queryFn: getFinalResult,
    enabled: isLoggedIn,
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};

export const useDownloadAdmissionTicketQuery = () => {
  const schedule = useSchedule();
  const day = dayjs();
  const { isLoggedIn } = useAuthState();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.ADMISSION_TICKET] as const,
    queryFn: getAdmissionTicket,
    enabled: isLoggedIn && day.isBetween(schedule.일차_합격_발표, schedule.이차_면접),
    retry: false,
  });

  return { data, ...restQuery };
};
