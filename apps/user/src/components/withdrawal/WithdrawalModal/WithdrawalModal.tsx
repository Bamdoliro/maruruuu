import { color } from '@maru/design-system';
import { Column, Confirm, Text } from '@maru/ui';
import { useEffect } from 'react';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WithdrawalModal = ({ isOpen, onClose, onConfirm }: WithdrawalModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <Confirm
      height={283}
      isOpen={isOpen}
      title="회원 탈퇴 하시겠습니까?"
      content={
        <Column>
          <Text color={color.gray900} fontType="p2">
            아래 회원 탈퇴 버튼을 누를 시 회원 탈퇴가 완료됩니다.
          </Text>
          <Text color={color.red} fontType="p2">
            이 이후 복구 불가능합니다.
          </Text>
        </Column>
      }
      onClose={onClose}
      onConfirm={onConfirm}
      confirmButtonText="확인"
      confirmButtonStyle={{ backgroundColor: `${color.red}` }}
    />
  );
};

export default WithdrawalModal;
