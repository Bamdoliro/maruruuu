import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { sendMessageByStatus, sendMessageByType, sendMessageToAll } from './api';
import type { SendMessageByStatusRequest, SendMessageByTypeRequest, SendMessageToAllRequest } from './api';

export const useSendMessageByStatusMutation = () => {
  const { handleError } = useApiError();

  const { mutate: sendMessageByStatusMutate, ...restMutation } = useMutation({
    mutationFn: (params: SendMessageByStatusRequest) => sendMessageByStatus(params),
    onError: handleError,
  });

  return { sendMessageByStatusMutate, ...restMutation };
};

export const useSendMessageByTypeMutation = () => {
  const { handleError } = useApiError();

  const { mutate: sendMessageByTypeMutate, ...restMutation } = useMutation({
    mutationFn: (params: SendMessageByTypeRequest) => sendMessageByType(params),
    onError: handleError,
  });

  return { sendMessageByTypeMutate, ...restMutation };
};

export const useSendMessageToAllMutation = () => {
  const { handleError } = useApiError();

  const { mutate: sendMessageToAllMutate, ...restMutation } = useMutation({
    mutationFn: (params: SendMessageToAllRequest) => sendMessageToAll(params),
    onError: handleError,
  });

  return { sendMessageToAllMutate, ...restMutation };
}; 