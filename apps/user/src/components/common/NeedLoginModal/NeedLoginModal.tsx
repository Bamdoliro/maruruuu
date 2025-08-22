import { color } from '@maru/design-system';
import { Column, Confirm, Text } from '@maru/ui';
import { useEffect } from 'react';

interface NeedLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const NeedLoginModal = ({ isOpen, onClose, onConfirm }: NeedLoginModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <Confirm
      height={350}
      isOpen={isOpen}
      title={
        <Column>
          <Text fontType="H2" color={color.gray900}>
            로그인 필요
          </Text>
          <Text fontType="p3" color={color.gray600}>
            이 페이지는 로그인이 필요한 페이지입니다.
          </Text>
        </Column>
      }
      content={
        <Text fontType="p2" color={color.gray900}>
          이 페이지는 로그인하지 않으면 접근할 수 없습니다.
          <br />
          로그인 후에 편리하게 서비스를 이용하실 수 있습니다.
        </Text>
      }
      onClose={onClose}
      onConfirm={onConfirm}
      confirmButtonText="로그인 하러 가기"
    />
  );
};

export default NeedLoginModal;
