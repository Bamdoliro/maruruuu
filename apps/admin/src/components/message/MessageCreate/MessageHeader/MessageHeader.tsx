import { Button } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import TitleInput from '../TitleInput/TitleInput';
import RecipientDropdown from '../RecipientDropdown/RecipientDropdown';
import type { MessageForm } from '../MessageCreate.hooks';

interface MessageHeaderProps {
  title: string;
  recipient: MessageForm['recipient'];
  onChange: (e: { target: { name: keyof MessageForm; value: string } }) => void;
  onSubmit: () => void;
}

const MessageHeader = ({
  title,
  recipient,
  onChange,
  onSubmit,
}: MessageHeaderProps) => {
  return (
    <StyledWrapper>
      <Content>
        <TitleInput name="title" value={title} handleChange={onChange} />
        <RecipientDropdown value={recipient} onChange={(value) => onChange({ target: { name: 'recipient', value } })} />
        <Button onClick={onSubmit} size="SMALL" disabled={!recipient}>
          발송하기
        </Button>
      </Content>
    </StyledWrapper>
  );
};

export default MessageHeader;

const StyledWrapper = styled.div`
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
