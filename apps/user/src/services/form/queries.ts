import { KEY } from '@/constants/common/constants';
import { useQuery } from '@tanstack/react-query';
import { getFormStatus, getSaveForm, getSchoolList } from './api';
import { useAuthState } from '@maru/hooks';

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
