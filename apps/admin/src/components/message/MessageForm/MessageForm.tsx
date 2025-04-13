'use client';

import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { flex } from '@maru/utils';
import MessageFormHeader from './MessageFormHeader';
import ContentTextarea from './ContentTextarea';

const MessageForm = () => {
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    // TODO: 메시지 발송 로직 구현
    console.log({ title, recipient, content });
  };

  return (
    <Container>
      <MessageFormHeader
        title={title}
        recipient={recipient}
        onTitleChange={handleTitleChange}
        onRecipientChange={setRecipient}
        onSubmit={handleSubmit}
      />
      <ContentTextarea value={content} onChange={handleContentChange} />
    </Container>
  );
};

export default MessageForm;

const Container = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  margin: 0 auto;
`;

const TopRow = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 48px;
  width: 100%;
  // padding-right: 120px;
  padding-bottom: 24px;
  margin-bottom: 48px;
  border-bottom: 1px solid #eaeaea;
`;

const RecipientRow = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 16px;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #666666;
`;

const ActionRow = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 16px;
`;
