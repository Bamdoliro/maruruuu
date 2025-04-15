import { flex } from '@maru/utils';
import styled from 'styled-components';
import MessageHeader from '@/components/message/MessageCreate/MessageHeader/MessageHeader';
import ContentTextarea from '@/components/message/MessageCreate/ContentTextarea/ContentTextarea';
import MessageConfirmModal from '@/components/message/MessageCreate/MessageConfirmModal/MessageConfirmModal';
import { useState, type ChangeEvent } from 'react';
import {
  usePostMessageByStatusMutation,
  usePostMessageByTypeMutation,
  usePostMessageToAllMutation,
} from '@/services/message/mutations';
import type { PostSendMessageByTypeRequest } from '@/types/message/remote';

interface MessageCreateProps {
  title: string;
  recipient: string;
  content: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRecipientChange: (value: string) => void;
  onContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

const MessageCreate = ({
  title,
  recipient,
  content,
  onTitleChange,
  onRecipientChange,
  onContentChange,
  onSubmit,
}: MessageCreateProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { postMessageByStatusMutate } = usePostMessageByStatusMutation();
  const { postMessageByTypeMutate } = usePostMessageByTypeMutation();
  const { postMessageToAllMutate } = usePostMessageToAllMutation();

  const resetForm = () => {
    onTitleChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
    onRecipientChange('');
    onContentChange({ target: { value: '' } } as ChangeEvent<HTMLTextAreaElement>);
    onSubmit();
  };

  const handleConfirm = () => {
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

  return (
    <StyledContainer>
      <MessageHeader
        title={title}
        recipient={recipient}
        onTitleChange={onTitleChange}
        onRecipientChange={onRecipientChange}
        onSubmit={handleSubmit}
      />
      <ContentTextarea value={content} onChange={onContentChange} />
      <MessageConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </StyledContainer>
  );
};

export default MessageCreate;

const StyledContainer = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  margin: 0 auto;
`;
