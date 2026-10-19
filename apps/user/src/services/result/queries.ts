import { KEY } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import { getFinalResult, getFirstResult } from './api';
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
