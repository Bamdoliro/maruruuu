import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useOverlay } from '@toss/use-overlay';
import MessageHeader from './MessageHeader/MessageHeader';
import ContentTextarea from './ContentTextarea/ContentTextarea';
import MessageConfirmModal from './MessageConfirmModal/MessageConfirmModal';
import RecipientList from './RecipientList/RecipientList';
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
      <StyledEditor>
        <MessageHeader
          title={form.title}
          recipient={form.recipient}
          onChange={handleChange}
          onSubmit={openConfirmModal}
        />
        <ContentTextarea name="content" value={form.content} onChange={handleChange} />
      </StyledEditor>
      {form.recipient && <RecipientList recipient={form.recipient} />}
    </StyledContainer>
  );
};

export default MessageCreate;

const StyledContainer = styled.div`
  ${flex({ alignItems: 'flex-start' })}
  gap: 40px;
  width: 100%;
  margin: 0 auto;
`;

const StyledEditor = styled.div`
  ${flex({ flexDirection: 'column' })}
  flex: 1;
  min-width: 0;
`;
