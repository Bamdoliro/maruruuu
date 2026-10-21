import { useApiError } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@maru/hooks';
import { KEY } from '@/constants/common/constant';
import type { PutScheduleReq } from '@/types/schedule/remote';
import { putCurrentSchedule } from './api';

export const usePutScheduleMutation = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const { toast } = useToast();

  const { mutate: putScheduleMutate, ...restMutation } = useMutation({
    mutationFn: (params: PutScheduleReq) => putCurrentSchedule(params),
    onSuccess: () => {
      toast('일정이 수정되었습니다.', 'SUCCESS');
      queryClient.invalidateQueries({ queryKey: [KEY.SCHEDULE] });
    },
    onError: handleError,
  });

  return { putScheduleMutate, ...restMutation };
};
