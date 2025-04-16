import { useState } from 'react';
import {
  usePostMessageByStatusMutation,
  usePostMessageByTypeMutation,
  usePostMessageToAllMutation,
} from '@/services/message/mutations';
import type { PostSendMessageByTypeRequest } from '@/types/message/remote';

type RecipientType =
  | 'APPROVED'
  | 'REJECTED'
  | 'FINAL_SUBMITTED'
  | 'FINAL_PASSED'
  | 'MEISTER_TALENT'
  | 'REGULAR'
  | 'REGULAR_CHANGED'
  | 'ALL';

export interface MessageForm {
  title: string;
  recipient: RecipientType;
  content: string;
}

export const useMessage = () => {
  const [form, setForm] = useState<MessageForm>({
    title: '',
    recipient: '' as RecipientType,
    content: '',
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { postMessageByStatusMutate } = usePostMessageByStatusMutation();
  const { postMessageByTypeMutate } = usePostMessageByTypeMutation();
  const { postMessageToAllMutate } = usePostMessageToAllMutation();

  const handleChange = (e: { target: { name: keyof MessageForm; value: string } }) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'recipient' ? (value as RecipientType) : value,
    }));
  };

  const resetForm = () => {
    setForm({
      title: '',
      recipient: '' as RecipientType,
      content: '',
    });
  };

  const handleConfirm = () => {
    const { title, content, recipient } = form;
    if (!title || !content || !recipient) return;

    if (
      recipient === 'APPROVED' ||
      recipient === 'REJECTED' ||
      recipient === 'FINAL_SUBMITTED' ||
      recipient === 'FINAL_PASSED'
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
    } else if (recipient === 'REGULAR_CHANGED') {
      postMessageByTypeMutate({
        title,
        text: content,
        formType: 'REGULAR',
        isChangeToRegular: true,
      } as PostSendMessageByTypeRequest);
    } else if (recipient === 'ALL') {
      postMessageToAllMutate({
        title,
        text: content,
      });
    }

    setIsConfirmModalOpen(false);
    resetForm();
  };

  const handleSubmit = () => {
    setIsConfirmModalOpen(true);
  };

  return {
    form,
    isConfirmModalOpen,
    handleChange,
    handleConfirm,
    handleSubmit,
    setIsConfirmModalOpen,
  };
};
