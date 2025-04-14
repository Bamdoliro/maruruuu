import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { sendMessageByStatus, sendMessageByType, sendMessageToAll } from './api';
import type { SendMessageByStatusRequest, SendMessageByTypeRequest, SendMessageToAllRequest } from './api';

export const useSendMessageByStatusMutation = () => {
  const { handleError } = useApiError();

  const { mutate: sendMessageByStatusMutate, ...restMutation } = useMutation({
    mutationFn: (params: SendMessageByStatusRequest) => sendMessageByStatus(params),
    onSuccess: () => {
      toast('메시지가 전송되었습니다.', {
        type: 'success',
      });
    },
    onError: handleError,
  });

  return { sendMessageByStatusMutate, ...restMutation };
};

export const useSendMessageByTypeMutation = () => {
  const { handleError } = useApiError();

  const { mutate: sendMessageByTypeMutate, ...restMutation } = useMutation({
    mutationFn: (params: SendMessageByTypeRequest) => sendMessageByType(params),
    onSuccess: () => {
      toast('메시지가 전송되었습니다.', {
        type: 'success',
      });
    },
    onError: handleError,
  });

  return { sendMessageByTypeMutate, ...restMutation };
};

export const useSendMessageToAllMutation = () => {
  const { handleError } = useApiError();

  const { mutate: sendMessageToAllMutate, ...restMutation } = useMutation({
    mutationFn: (params: SendMessageToAllRequest) => sendMessageToAll(params),
    onSuccess: () => {
      toast('메시지가 전송되었습니다.', {
        type: 'success',
      });
    },
    onError: handleError,
  });

  return { sendMessageToAllMutate, ...restMutation };
}; 