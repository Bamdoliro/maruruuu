import { KEY } from '@/constants/common/constant';
import { useQuery } from '@tanstack/react-query';
import { getCurrentSchedule } from './api';

export const useScheduleQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SCHEDULE],
    queryFn: getCurrentSchedule,
  });

  return { data: data?.data, ...restQuery };
};
