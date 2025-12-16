import { useMutation } from '@tanstack/react-query';
import type { FairApiRequestBody } from '@/components/fair/FairForm/fair.hooks';
import { postFairReq } from '@/services/fair/api';
import { useApiError } from '@/hooks';
import { useToast } from '@maru/hooks';

export const useCreateFairMutation = () => {
  const { handleError } = useApiError();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: FairApiRequestBody) => postFairReq(data),
    onSuccess: () => {
      toast('입학 설명회 일정이 만들어졌습니다.', 'SUCCESS');
    },
    onError: handleError,
  });
};
