import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useOverlay } from '@toss/use-overlay';
import MessageHeader from './MessageHeader/MessageHeader';
import ContentTextarea from './ContentTextarea/ContentTextarea';
import MessageConfirmModal from './MessageConfirmModal/MessageConfirmModal';
import { useMessage } from './MessageCreate.hooks';

const MessageCreate = () => {
  const overlay = useOverlay();
  const { form, handleChange, handleConfirm } = useMessage();

  const openConfirmModal = () => {
    overlay.open(({ isOpen, close }) => (
      <MessageConfirmModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={() => {
          handleConfirm();
          close();
        }}
      />
    ));
  };

  return (
    <StyledContainer>
      <MessageHeader
        title={form.title}
        recipient={form.recipient}
        onChange={handleChange}
        onSubmit={openConfirmModal}
      />
      <ContentTextarea name="content" value={form.content} onChange={handleChange} />
    </StyledContainer>
  );
};

export default MessageCreate;

const StyledContainer = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  margin: 0 auto;
`;
