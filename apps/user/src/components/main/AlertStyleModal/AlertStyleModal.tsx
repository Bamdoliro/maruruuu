import { color } from '@maru/design-system';
import { Button, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface AlertStyleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | null;
}

const AlertStyleModal = ({ isOpen, onClose, title }: AlertStyleModalProps) => {
  return (
    <BlurBackground isOpen={isOpen}>
      <StyledAlertStyleModal>
        <Text fontType="H3" color={color.gray900}>
          {title}
        </Text>
        <Row justifyContent="flex-end">
          <Button size="SMALL" styleType="SECONDARY" width={60} onClick={onClose}>
            닫기
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
