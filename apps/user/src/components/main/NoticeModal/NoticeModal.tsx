import { styled } from 'styled-components';
import { flex } from '@maru/utils';
import { color } from '@maru/design-system';
import Column from '@maru/ui/src/Flex/Column';
import Row from '@maru/ui/src/Flex/Row';
import Text from '@maru/ui/src/Text/Text';
import Button from '@maru/ui/src/Button/Button';
import React from 'react';
import { IconClose } from '@maru/icon';
import { useRouter } from 'next/navigation';
import { useModalSuppression } from '@/hooks/useModalSuppression';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoticeModal = ({ isOpen, onClose }: NoticeModalProps) => {
  const router = useRouter();
  const { isSuppressed, suppressModal } = useModalSuppression('notice');

  if (isSuppressed) return null;

  const handleConfirm = () => {
    router.push('/notice');
  };

  const handleSuppressAndClose = () => {
    suppressModal();
    onClose();
  };

  return (
    <BlurBackground $isOpen={isOpen}>
      <StyledNoticeModal>
        <Column gap={20}>
          <Column
            style={{ paddingBottom: 20, borderBottom: `1px solid ${color.gray200}` }}
            gap={8}
          >
            <Row justifyContent="space-between" alignItems="center">
              <Text fontType="H2" color={color.gray900}>
                원서제출 관련 공지사항입니다.
              </Text>
              <IconClose
                onClick={onClose}
                color={color.gray600}
                width={36}
                height={36}
                cursor="pointer"
              />
            </Row>
          </Column>
          <Column style={{ height: '100%', width: '100%' }} alignItems="flex-start">
            <Text fontType="p2" whiteSpace="break-spaces">
              안녕하세요, 부산소프트웨어마이스터고등학교입니다.
              <br />
              지원자 여러분께서 원서 제출 절차에 대해 많이 궁금해하셔서, 자세히
              공지사항에서 알려드립니다.
              <br />
              <br />
              공지사항은 사이트 상단 탭에 있습니다.
              <br />
            </Text>
          </Column>
        </Column>

        <Row justifyContent="flex-end" gap={12}>
          <Button
            size="SMALL"
            styleType="SECONDARY"
            width={180}
            onClick={handleSuppressAndClose}
          >
            하루 동안 보지 않기
          </Button>
          <Button size="SMALL" styleType="PRIMARY" width={88} onClick={handleConfirm}>
            보러가기
          </Button>
        </Row>
      </StyledNoticeModal>
    </BlurBackground>
  );
};

export default NoticeModal;

const BlurBackground = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const StyledNoticeModal = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  gap: 29px;
  width: 600px;
  padding: 40px;
  background-color: ${color.white};
  border-radius: 16px;
`;
