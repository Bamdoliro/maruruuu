import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@maru/hooks';
import { postMessageByStatus, postMessageByType, postMessageToAll } from './api';
import { useSetMessageFormStore } from '@/store';
import type { MessageForm } from '@/types/message/client';

export const usePostMessageByStatusMutation = () => {
  const { handleError } = useApiError();
  const setMessageForm = useSetMessageFormStore();
  const { toast } = useToast();

  const { mutate: postMessageByStatusMutate, ...restMutation } = useMutation({
    mutationFn: postMessageByStatus,
    onSuccess: () => {
      toast('메시지를 성공적으로 전송했습니다.', 'SUCCESS');
      setMessageForm({
        title: '',
        recipient: '' as MessageForm['recipient'],
        content: '',
      });
    },
    onError: handleError,
  });

  return { postMessageByStatusMutate, ...restMutation };
};

export const usePostMessageByTypeMutation = () => {
  const { handleError } = useApiError();
  const setMessageForm = useSetMessageFormStore();
  const { toast } = useToast();

  const { mutate: postMessageByTypeMutate, ...restMutation } = useMutation({
    mutationFn: postMessageByType,
    onSuccess: () => {
      toast('메시지를 성공적으로 전송했습니다.', 'SUCCESS');
      setMessageForm({
        title: '',
        recipient: '' as MessageForm['recipient'],
        content: '',
      });
    },
    onError: handleError,
  });

  return { postMessageByTypeMutate, ...restMutation };
};

export const usePostMessageToAllMutation = () => {
  const { handleError } = useApiError();
  const setMessageForm = useSetMessageFormStore();
  const { toast } = useToast();

  const { mutate: postMessageToAllMutate, ...restMutation } = useMutation({
    mutationFn: postMessageToAll,
    onSuccess: () => {
      toast('메시지를 성공적으로 전송했습니다.', 'SUCCESS');
      setMessageForm({
        title: '',
        recipient: '' as MessageForm['recipient'],
        content: '',
      });
    },
    onError: handleError,
  });

  return { postMessageToAllMutate, ...restMutation };
};
