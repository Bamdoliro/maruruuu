import { useApiError, useToast } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { patchEnter } from './api';
import { useSetEntrollmentDocumentStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constants';

export const useChangeFormEnterStatusMutation = () => {
  const { handleError } = useApiError();
  const setEntrollmentDocument = useSetEntrollmentDocumentStore();
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: changeFormEnterStatusMutate, ...restMutation } = useMutation({
    mutationFn: () => patchEnter(),
    onSuccess: () => {
      toast('서류가 제출 되었습니다.', 'SUCCESS');
      router.push(ROUTES.MAIN);
      setEntrollmentDocument({ fileName: '', formUrl: '' });
    },
    onError: handleError,
  });

  return { changeFormEnterStatusMutate, ...restMutation };
};
