'use client';

import { Text } from '@maru/ui';
import AppLayout from '@/layouts/AppLayout';
import MessageCreate from '@/components/message/MessageCreate/MessageCreate';
import MessageConfirmModal from '@/components/message/MessageCreate/components/MessageConfirmModal/MessageConfirmModal';
import { useState, type ChangeEvent } from 'react';
import styled from 'styled-components';
import { flex } from '@maru/utils';
import { color, font } from '@maru/design-system';

const MessagePage = () => {
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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
    setIsConfirmModalOpen(true);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalConfirm = () => {
    setIsConfirmModalOpen(false);
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
        <MessageConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={handleConfirmModalClose}
          onConfirm={handleConfirmModalConfirm}
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

const StyledHeader = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 24px;
  margin-bottom: 40px;
`;

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.gray300};
`;

const StyledMessageContent = styled.div`
  max-width: 800px;
`;

const StyledMessageHeading = styled.h1`
  ${font.H1}
  color: ${color.gray900};
`;
