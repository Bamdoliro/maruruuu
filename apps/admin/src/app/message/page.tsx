'use client';

import { Text } from '@maru/ui';
import AppLayout from '@/layouts/AppLayout';
import MessageCreate from '@/components/message/MessageCreate/MessageCreate';
import styled from 'styled-components';
import { flex } from '@maru/utils';

const MessagePage = () => {
  return (
    <AppLayout>
      <StyledMessagePage>
        <Text fontType="H1">단체 메시지 발송</Text>
        <MessageCreate />
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
