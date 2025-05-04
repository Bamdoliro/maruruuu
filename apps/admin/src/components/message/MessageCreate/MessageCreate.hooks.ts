import {
  usePostMessageByStatusMutation,
  usePostMessageByTypeMutation,
} from '@/services/message/mutations';
import type { PostSendMessageByTypeRequest } from '@/types/message/remote';
import type { MessageForm } from '@/types/message/client';
import { MESSAGE_STATUS_VALUES } from '@/constants/message/constant';
import { useMessageFormStore } from '@/store/message/messageForm';

export const useMessage = () => {
  const [form, setForm] = useMessageFormStore();
  const { postMessageByStatusMutate } = usePostMessageByStatusMutation();
  const { postMessageByTypeMutate } = usePostMessageByTypeMutation();

  const handleChange = (e: { target: { name: keyof MessageForm; value: string } }) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    const { title, content, recipient } = form;
    if (!title || !content || !recipient) return;

    if (MESSAGE_STATUS_VALUES.includes(recipient)) {
      postMessageByStatusMutate({
        title,
        text: content,
        status: recipient,
      });
    } else if (recipient === 'MEISTER_TALENT') {
      postMessageByTypeMutate({
        title,
        text: content,
        formType: 'MEISTER_TALENT',
        isChangeToRegular: false,
      } as PostSendMessageByTypeRequest);
    } else if (recipient === 'REGULAR') {
      postMessageByTypeMutate({
        title,
        text: content,
        formType: 'REGULAR',
        isChangeToRegular: false,
      } as PostSendMessageByTypeRequest);
    }
  };

  return {
    form,
    handleChange,
    handleConfirm,
  };
};
