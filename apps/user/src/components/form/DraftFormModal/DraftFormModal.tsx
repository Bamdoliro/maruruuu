import { color } from '@maru/design-system';
import { CheckInput, Column, Confirm, Text } from '@maru/ui';
import { useState } from 'react';
import type { ChangeEvent } from 'react';

interface DraftFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DraftFormModal = ({ isOpen, onClose, onConfirm }: DraftFormModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsInputValid(value === '확인했습니다');
  };

  return (
    <Confirm
      isOpen={isOpen}
      title="입학 원서를 제출하시겠습니까?"
      content={
        <Column gap={28}>
          <Column gap={20}>
            <Text fontType="p2" color={color.red}>
              원서 초안 제출 시 부산소프트웨어마이스터고등학교 입학전형에 응시한 것으로
              <br />
              처리되며 더 이상 입학원서 수정이 불가능합니다.
            </Text>
            <Text fontType="p2" color={color.red}>
              원서 초안을 다시 한번 확인 하시고 잘못 입력한 부분이 없다고 판단되시는 경우
              아래
              <br />의 입력 칸에{' '}
              <Text fontType="H5" color={color.maruDefault}>
                ‘확인했습니다’
              </Text>
              를 입력해 주세요.
            </Text>
          </Column>
          <CheckInput
            width="100%"
            placeholder="입력 칸을 채워주세요"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Column>
      }
      onClose={onClose}
      onConfirm={isInputValid ? onConfirm : () => {}}
      confirmButtonText="원서 제출하기"
      confirmButtonStyle={{
        backgroundColor: isInputValid ? color.maruDefault : color.gray500,
        cursor: isInputValid ? 'pointer' : 'not-allowed',
      }}
    />
  );
};

export default DraftFormModal;
