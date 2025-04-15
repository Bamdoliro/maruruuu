import { Button, SubDropdown } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import TitleInput from './TitleInput';
import type { ChangeEvent } from 'react';

const RECIPIENT_OPTIONS = [
  { value: 'FINAL_SUBMITTED', label: '최종 제출된 원서' },
  { value: 'APPROVED', label: '원서 승인 완료자' },
  { value: 'REJECTED', label: '원서 반려자' },
  {
    value: 'FIRST_PASSED',
    label: '1차 합격자',
    children: [
      { value: 'MEISTER_TALENT', label: '마이스터인재전형' },
      { value: 'REGULAR', label: '일반전형' },
      { value: 'ALL', label: '전체 1차 합격자' },
    ],
  },
  { value: 'FINAL_PASSED', label: '최종 합격자' },
];

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
        <SubDropdown
          data={RECIPIENT_OPTIONS}
          value={recipient}
          onChange={(value) => onRecipientChange(value)}
          name="recipient"
          placeholder="받는 사람"
          width={200}
        />
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