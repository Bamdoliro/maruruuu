import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useApiError } from '@/hooks';
import type {
  PostSendMessageByStatusRequest,
  PostSendMessageByTypeRequest,
  PostSendMessageToAllRequest,
} from '@/types/message/remote';
import { postMessageByStatus, postMessageByType, postMessageToAll } from './api';

export const usePostMessageByStatusMutation = () => {
  const { handleError } = useApiError();

  const { mutate: postMessageByStatusMutate, ...restMutation } = useMutation({
    mutationFn: (params: PostSendMessageByStatusRequest) => postMessageByStatus(params),
    onSuccess: () => {
      toast('메시지를 성공적으로 전송했습니다.', { type: 'success' });
    },
    onError: handleError,
  });

  return { postMessageByStatusMutate, ...restMutation };
};

export const usePostMessageByTypeMutation = () => {
  const { handleError } = useApiError();

  const { mutate: postMessageByTypeMutate, ...restMutation } = useMutation({
    mutationFn: (params: PostSendMessageByTypeRequest) => postMessageByType(params),
    onSuccess: () => {
      toast('메시지를 성공적으로 전송했습니다.', { type: 'success' });
    },
    onError: handleError,
  });

  return { postMessageByTypeMutate, ...restMutation };
};

export const usePostMessageToAllMutation = () => {
  const { handleError } = useApiError();

  const { mutate: postMessageToAllMutate, ...restMutation } = useMutation({
    mutationFn: (params: PostSendMessageToAllRequest) => postMessageToAll(params),
    onSuccess: () => {
      toast('메시지를 성공적으로 전송했습니다.', { type: 'success' });
    },
    onError: handleError,
  });

  return { postMessageToAllMutate, ...restMutation };
};
