'use client';

import { Text } from '@maru/ui';
import AppLayout from '@/layouts/AppLayout';
import MessageCreate from '@/components/message/MessageCreate/MessageCreate';
import { useState, type ChangeEvent } from 'react';
import styled from 'styled-components';
import { flex } from '@maru/utils';

const MessagePage = () => {
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleRecipientChange = (value: string) => {
    setRecipient(value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    setTitle('');
    setRecipient('');
    setContent('');
  };

  return (
    <AppLayout>
      <StyledMessagePage>
        <Text fontType="H1">단체 메시지 발송</Text>
        <MessageCreate
          title={title}
          recipient={recipient}
          content={content}
          onTitleChange={handleTitleChange}
          onRecipientChange={handleRecipientChange}
          onContentChange={handleContentChange}
          onSubmit={handleSubmit}
        />
      </StyledMessagePage>
    </AppLayout>
  );
};

export default MessagePage;

const StyledMessagePage = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 40px;
  width: 100%;
  min-height: 100vh;
  padding: 64px 60px;
`;
