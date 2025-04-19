import { useMutation } from '@tanstack/react-query';
import type { FairApiRequestBody } from '@/utils/functions/getRequestBody';
import { postFairReq } from '@/services/fair/api';

export const useCreateFairMutation = () => {
  return useMutation({
    mutationFn: (data: FairApiRequestBody) => postFairReq(data),
  });
};
