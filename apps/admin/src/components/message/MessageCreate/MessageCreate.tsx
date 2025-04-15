import { flex } from '@maru/utils';
import styled from 'styled-components';
import MessageHeader from './components/MessageHeader/MessageHeader';
import ContentTextarea from './components/ContentTextarea/ContentTextarea';
import MessageConfirmModal from './MessageConfirmModal';
import { useState, type ChangeEvent } from 'react';
import {
  usePostMessageByStatusMutation,
  usePostMessageByTypeMutation,
  usePostMessageToAllMutation,
} from '@/services/message/mutations';

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
    resetForm();
  };

  const handleSubmit = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <Container>
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
    </Container>
  );
};

export default MessageCreate;

const Container = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  margin: 0 auto;
`;
