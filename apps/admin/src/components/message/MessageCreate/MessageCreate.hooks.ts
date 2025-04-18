import { useState } from 'react';
import {
  usePostMessageByStatusMutation,
  usePostMessageByTypeMutation,
} from '@/services/message/mutations';
import type { PostSendMessageByTypeRequest } from '@/types/message/remote';
import type { MessageForm } from '@/types/message/client';

export const useMessage = () => {
  const [form, setForm] = useState<MessageForm>({
    title: '',
    recipient: '' as MessageForm['recipient'],
    content: '',
  });

  const resetForm = () => {
    setForm({
      title: '',
      recipient: '' as MessageForm['recipient'],
      content: '',
    });
  };

  const commonOnSuccess = () => {
    resetForm();
  };

  const { postMessageByStatusMutate } = usePostMessageByStatusMutation({
    onSuccess: commonOnSuccess,
  });

  const { postMessageByTypeMutate } = usePostMessageByTypeMutation({
    onSuccess: commonOnSuccess,
  });

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

    if (
      recipient === 'FINAL_SUBMITTED' ||
      recipient === 'RECEIVED' ||
      recipient === 'REJECTED' ||
      recipient === 'FIRST_PASSED' ||
      recipient === 'PASSED'
    ) {
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
