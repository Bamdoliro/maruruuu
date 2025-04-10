import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { postFairApplication } from './api';
import type { FairApplication } from '@/types/fair/client';
import { toast } from 'react-toastify';
import { ROUTES } from '@/constants/common/constants';

export const useFairApplicationQuery = (
  id: number,
  fairApplicationData: FairApplication
) => {
  const { handleError } = useApiError();
  const router = useRouter();

  const { mutate: postFairApplicationMutate, ...restMutation } = useMutation({
    mutationFn: () => postFairApplication(id, fairApplicationData),
    onSuccess: () => {
      toast('입학 설명회 참석 신청이 되었습니다.', {
        type: 'success',
      });
      router.push(ROUTES.MAIN);
    },
    onError: handleError,
  });

  return { postFairApplicationMutate, ...restMutation };
};
