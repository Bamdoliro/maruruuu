import { flex } from '@maru/utils';
import styled from 'styled-components';
import MessageHeader from './components/MessageHeader/MessageHeader';
import ContentTextarea from './components/ContentTextarea/ContentTextarea';
import { ChangeEvent } from 'react';

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
  return (
    <Container>
      <MessageHeader
        title={title}
        recipient={recipient}
        onTitleChange={onTitleChange}
        onRecipientChange={onRecipientChange}
        onSubmit={onSubmit}
      />
      <ContentTextarea value={content} onChange={onContentChange} />
    </Container>
  );
};

export default MessageCreate;

const Container = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  margin: 0 auto;
`;
