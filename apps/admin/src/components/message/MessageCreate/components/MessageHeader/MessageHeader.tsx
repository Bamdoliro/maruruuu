import { Button } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import TitleInput from '@/components/message/MessageForm/TitleInput';
import RecipientDropdown from '@/components/message/MessageForm/RecipientDropdown';
import { ChangeEvent } from 'react';

interface MessageHeaderProps {
  title: string;
  recipient: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRecipientChange: (value: string) => void;
  onSubmit: () => void;
}

const MessageHeader = ({
  title,
  recipient,
  onTitleChange,
  onRecipientChange,
  onSubmit,
}: MessageHeaderProps) => {
  return (
    <Wrapper>
      <Content>
        <TitleInput value={title} onChange={onTitleChange} />
        <RecipientDropdown value={recipient} onChange={onRecipientChange} />
        <Button onClick={onSubmit} size="SMALL" disabled={!recipient}>
          발송하기
        </Button>
      </Content>
    </Wrapper>
  );
};

export default MessageHeader;

const Wrapper = styled.div`
  width: 100%;
  padding-right: 120px;
  margin-bottom: 48px;
`;

const Content = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 48px;
  width: 100%;
  padding-bottom: 24px;
  border-bottom: 1px solid #eaeaea;
`;
