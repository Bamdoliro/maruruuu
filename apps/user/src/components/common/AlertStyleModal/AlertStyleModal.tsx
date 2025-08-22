import { color } from '@maru/design-system';
import { IconClose } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useEffect, type ReactNode } from 'react';
import type { CSSProperties } from 'styled-components';
import { styled } from 'styled-components';

interface AlertStyleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | null;
  content: ReactNode;
  height?: CSSProperties['height'];
}

const AlertStyleModal = ({
  isOpen,
  onClose,
  title,
  content,
  height,
}: AlertStyleModalProps) => {
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
    <BlurBackground isOpen={isOpen}>
      <StyledAlertStyleModal style={{ height, minHeight: height }}>
        <Column
          style={{ paddingBottom: 20, borderBottom: `1px solid ${color.gray200}` }}
          gap={8}
        >
          <Row justifyContent="space-between" alignItems="center">
            <Text fontType="H2" color={color.gray900}>
              {title}
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
        <Column
          gap={8}
          style={{ height: '100%', width: '100%', marginTop: 20 }}
          alignItems="flex-start"
        >
          {content}
        </Column>
        <Row justifyContent="flex-end">
          <Button size="SMALL" styleType="PRIMARY" width={60} onClick={onClose}>
            확인
          </Button>
        </Row>
      </StyledAlertStyleModal>
    </BlurBackground>
  );
};

export default AlertStyleModal;

const BlurBackground = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const StyledAlertStyleModal = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 600px;
  height: 178px;
  background: ${color.white};
  border-radius: 16px;
  padding: 36px;
`;
