import { flex } from '@maru/utils';
import styled from 'styled-components';
import MessageHeader from './MessageHeader/MessageHeader';
import ContentTextarea from './ContentTextarea/ContentTextarea';
import MessageConfirmModal from './MessageConfirmModal/MessageConfirmModal';
import { useMessage } from './MessageCreate.hooks';

const MessageCreate = () => {
  const {
    form,
    isConfirmModalOpen,
    handleChange,
    handleConfirm,
    handleSubmit,
    setIsConfirmModalOpen,
  } = useMessage();

  return (
    <StyledContainer>
      <MessageHeader
        title={form.title}
        recipient={form.recipient}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <ContentTextarea name="content" value={form.content} onChange={handleChange} />
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
