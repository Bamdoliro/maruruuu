import { flex } from '@maru/utils';
import styled from 'styled-components';
import MessageHeader from './components/MessageHeader/MessageHeader';
import ContentTextarea from './components/ContentTextarea/ContentTextarea';
import { ChangeEvent } from 'react';

interface MessageCreateProps {
  title: string;
  text: string;
  messageType: 'status' | 'type' | 'all';
  status?: string;
  formType?: 'MEISTER_TALENT' | 'REGULAR';
  isChangeToRegular?: boolean;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onMessageTypeChange: (type: 'status' | 'type' | 'all') => void;
  onStatusChange?: (status: string) => void;
  onFormTypeChange?: (formType: 'MEISTER_TALENT' | 'REGULAR') => void;
  onIsChangeToRegularChange?: (value: boolean) => void;
  onSubmit: () => void;
}

const MessageCreate = ({
  title,
  text,
  messageType,
  status,
  formType,
  isChangeToRegular,
  onTitleChange,
  onTextChange,
  onMessageTypeChange,
  onStatusChange,
  onFormTypeChange,
  onIsChangeToRegularChange,
  onSubmit,
}: MessageCreateProps) => {
  return (
    <Container>
      <MessageHeader
        title={title}
        messageType={messageType}
        status={status}
        formType={formType}
        isChangeToRegular={isChangeToRegular}
        onTitleChange={onTitleChange}
        onMessageTypeChange={onMessageTypeChange}
        onStatusChange={onStatusChange}
        onFormTypeChange={onFormTypeChange}
        onIsChangeToRegularChange={onIsChangeToRegularChange}
        onSubmit={onSubmit}
      />
      <ContentTextarea value={text} onChange={onTextChange} />
    </Container>
  );
};

export default MessageCreate;

const Container = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  margin: 0 auto;
`;
