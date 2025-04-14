import { flex } from '@maru/utils';
import styled from 'styled-components';
import MessageHeader from './components/MessageHeader/MessageHeader';
import ContentTextarea from './components/ContentTextarea/ContentTextarea';
import MessageConfirmModal from './components/MessageConfirmModal/MessageConfirmModal';
import { ChangeEvent, useState } from 'react';
import { useSendMessageByStatusMutation, useSendMessageByTypeMutation, useSendMessageToAllMutation } from '@/services/message/mutations';
import { toast } from 'react-toastify';

type RecipientType = 'APPROVED' | 'REJECTED' | 'FINAL_SUBMITTED' | 'FINAL_PASSED' | 'MEISTER_TALENT' | 'REGULAR' | 'REGULAR_CHANGED' | 'ALL';

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
  const { sendMessageByStatusMutate } = useSendMessageByStatusMutation();
  const { sendMessageByTypeMutate } = useSendMessageByTypeMutation();
  const { sendMessageToAllMutate } = useSendMessageToAllMutation();

  const handleConfirm = async () => {
    if (!title || !content || !recipient) return;

    try {
      if (recipient === 'APPROVED' || recipient === 'REJECTED' || recipient === 'FINAL_SUBMITTED' || recipient === 'FINAL_PASSED') {
        await sendMessageByStatusMutate({
          title,
          text: content,
          status: recipient,
        });
      } else if (recipient === 'MEISTER_TALENT') {
        await sendMessageByTypeMutate({
          title,
          text: content,
          formType: 'MEISTER_TALENT',
          isChangeToRegular: false,
        });
      } else if (recipient === 'REGULAR') {
        await sendMessageByTypeMutate({
          title,
          text: content,
          formType: 'REGULAR',
          isChangeToRegular: false,
        });
      } else if (recipient === 'REGULAR_CHANGED') {
        await sendMessageByTypeMutate({
          title,
          text: content,
          formType: 'REGULAR',
          isChangeToRegular: true,
        });
      } else if (recipient === 'ALL') {
        await sendMessageToAllMutate({
          title,
          text: content,
        });
      }

      toast('메시지를 성공적으로 전송했습니다.', {
        type: 'success'
      });
      setIsConfirmModalOpen(false);
      onTitleChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
      onRecipientChange('');
      onContentChange({ target: { value: '' } } as ChangeEvent<HTMLTextAreaElement>);
      onSubmit();
    } catch (e) {
      toast('메시지 전송에 실패했습니다.', {
        type: 'error'
      });
    }
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
