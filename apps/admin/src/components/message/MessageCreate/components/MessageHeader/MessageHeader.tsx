import { Button } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import TitleInput from '@/components/message/MessageForm/TitleInput';
import { ChangeEvent } from 'react';

interface MessageHeaderProps {
  title: string;
  messageType: 'status' | 'type' | 'all';
  status?: string;
  formType?: 'MEISTER_TALENT' | 'REGULAR';
  isChangeToRegular?: boolean;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMessageTypeChange: (type: 'status' | 'type' | 'all') => void;
  onStatusChange?: (status: string) => void;
  onFormTypeChange?: (formType: 'MEISTER_TALENT' | 'REGULAR') => void;
  onIsChangeToRegularChange?: (value: boolean) => void;
  onSubmit: () => void;
}

const MessageHeader = ({
  title,
  messageType,
  status,
  formType,
  isChangeToRegular,
  onTitleChange,
  onMessageTypeChange,
  onStatusChange,
  onFormTypeChange,
  onIsChangeToRegularChange,
  onSubmit,
}: MessageHeaderProps) => {
  return (
    <Wrapper>
      <Content>
        <TitleInput value={title} onChange={onTitleChange} />
        <TypeSelector>
          <select value={messageType} onChange={(e) => onMessageTypeChange(e.target.value as 'status' | 'type' | 'all')}>
            <option value="all">전체 발송</option>
            <option value="status">상태별 발송</option>
            <option value="type">전형별 발송</option>
          </select>
          {messageType === 'status' && onStatusChange && (
            <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
              <option value="FINAL_SUBMITTED">최종 제출</option>
              {/* 다른 상태 옵션들 추가 */}
            </select>
          )}
          {messageType === 'type' && onFormTypeChange && (
            <>
              <select value={formType} onChange={(e) => onFormTypeChange(e.target.value as 'MEISTER_TALENT' | 'REGULAR')}>
                <option value="MEISTER_TALENT">마이스터인재전형</option>
                <option value="REGULAR">일반전형</option>
              </select>
              <label>
                <input
                  type="checkbox"
                  checked={isChangeToRegular}
                  onChange={(e) => onIsChangeToRegularChange?.(e.target.checked)}
                />
                일반전형 전환
              </label>
            </>
          )}
        </TypeSelector>
        <Button onClick={onSubmit} size="SMALL">
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

const TypeSelector = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 16px;
`;
