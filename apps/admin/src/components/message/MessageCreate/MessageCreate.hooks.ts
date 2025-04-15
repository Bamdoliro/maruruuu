import { useState, type ChangeEvent } from 'react';
import {
  usePostMessageByStatusMutation,
  usePostMessageByTypeMutation,
  usePostMessageToAllMutation,
} from '@/services/message/mutations';

export const useMessageCreateAction = (
  title: string,
  recipient: string,
  content: string,
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onRecipientChange: (value: string) => void,
  onContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  onSubmit: () => void
) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { mutateAsync: postMessageByStatusMutate } = usePostMessageByStatusMutation();
  const { mutateAsync: postMessageByTypeMutate } = usePostMessageByTypeMutation();
  const { mutateAsync: postMessageToAllMutate } = usePostMessageToAllMutation();

  const handleConfirm = async () => {
    if (!title || !content || !recipient) return;

    if (
      recipient === 'APPROVED' ||
      recipient === 'REJECTED' ||
      recipient === 'FINAL_SUBMITTED' ||
      recipient === 'FINAL_PASSED'
    ) {
      await postMessageByStatusMutate({
        title,
        text: content,
        status: recipient,
      });
    } else if (recipient === 'MEISTER_TALENT') {
      await postMessageByTypeMutate({
        title,
        text: content,
        formType: 'MEISTER_TALENT',
        isChangeToRegular: false,
      });
    } else if (recipient === 'REGULAR') {
      await postMessageByTypeMutate({
        title,
        text: content,
        formType: 'REGULAR',
        isChangeToRegular: false,
      });
    } else if (recipient === 'REGULAR_CHANGED') {
      await postMessageByTypeMutate({
        title,
        text: content,
        formType: 'REGULAR',
        isChangeToRegular: true,
      });
    } else if (recipient === 'ALL') {
      await postMessageToAllMutate({
        title,
        text: content,
      });
    }

    setIsConfirmModalOpen(false);
    onTitleChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
    onRecipientChange('');
    onContentChange({ target: { value: '' } } as ChangeEvent<HTMLTextAreaElement>);
    onSubmit();
  };

  const handleSubmit = () => {
    setIsConfirmModalOpen(true);
  };

  return {
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    handleConfirm,
    handleSubmit,
  };
}; 