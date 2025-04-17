import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postMessageByStatus, postMessageByType, postMessageToAll } from './api';

export const usePostMessageByStatusMutation = (options?: { onSuccess?: () => void }) => {
  const { handleError } = useApiError();

  const { mutate: postMessageByStatusMutate, ...restMutation } = useMutation({
    mutationFn: postMessageByStatus,
    onSuccess: () => {
      toast('메시지를 성공적으로 전송했습니다.', { type: 'success' });
      options?.onSuccess?.();
    },
    onError: handleError,
  });

  return { postMessageByStatusMutate, ...restMutation };
};

export const usePostMessageByTypeMutation = (options?: { onSuccess?: () => void }) => {
  const { handleError } = useApiError();

  const { mutate: postMessageByTypeMutate, ...restMutation } = useMutation({
    mutationFn: postMessageByType,
    onSuccess: () => {
      toast('메시지를 성공적으로 전송했습니다.', { type: 'success' });
      options?.onSuccess?.();
    },
    onError: handleError,
  });

  return { postMessageByTypeMutate, ...restMutation };
};

export const usePostMessageToAllMutation = (options?: { onSuccess?: () => void }) => {
  const { handleError } = useApiError();

  const { mutate: postMessageToAllMutate, ...restMutation } = useMutation({
    mutationFn: postMessageToAll,
    onSuccess: () => {
      toast('메시지를 성공적으로 전송했습니다.', { type: 'success' });
      options?.onSuccess?.();
    },
    onError: handleError,
  });

  return { postMessageToAllMutate, ...restMutation };
};
