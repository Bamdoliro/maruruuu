import { styled } from 'styled-components';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import { Button, Column, Row, Text } from '@maru/ui';
import { IconClose } from '@maru/icon';
import { useState } from 'react';
import { RECEIVED_STATUS_LIST } from '@/constants/form/constant';
import { type ReceiveStatusValue } from '@/types/form/client';
import { useReceiveStatusChangeModalAction } from '@/components/form/FormDetail/ReceiveStatusChangeModal/ReceiveStatusChangeModal.hook';

interface ReceivedStatusChangeModalProps {
  formId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ReceiveStatusChangeModal = ({
  formId,
  isOpen,
  onClose,
}: ReceivedStatusChangeModalProps) => {
  const [receiveStatus, setReceiveStatus] = useState<ReceiveStatusValue | null>(null);

  const handleRadioCardClick = (status: ReceiveStatusValue) => {
    setReceiveStatus(status);
  };

  const { handleReceiveStatusChange } = useReceiveStatusChangeModalAction(
    formId,
    receiveStatus,
    onClose
  );

  return (
    <BlurBackground isOpen={isOpen}>
      <StyledReceivedStatusChangeModal>
        <Column gap={8}>
          <Row justifyContent="space-between">
            <Text fontType="H2" color={color.gray900}>
              최종 접수 확인
            </Text>
            <IconClose
              width={36}
              height={36}
              color={color.gray600}
              cursor="pointer"
              onClick={onClose}
            />
          </Row>
          <Text fontType="caption" color={color.gray600}>
            지원자의 원서와 증빙서류를 확인해주시기 바랍니다.
          </Text>
        </Column>
        <Row gap={12}>
          {RECEIVED_STATUS_LIST.map((item) => {
            const isChecked = receiveStatus === item.value;
            return (
              <CardRadioBox
                onClick={() => handleRadioCardClick(item.value)}
                checked={isChecked}
                $color={item.color}
                backgroundColor={item.backgroundColor}
              >
                <Text fontType="context" color={isChecked ? item.color : color.gray600}>
                  {item.name}
                </Text>
              </CardRadioBox>
            );
          })}
        </Row>
        <Row justifyContent="end" gap={16}>
          <Button styleType="SECONDARY" size="SMALL" onClick={onClose}>
            취소
          </Button>
          <Button
            styleType={!receiveStatus ? 'DISABLED' : 'PRIMARY'}
            size="SMALL"
            onClick={handleReceiveStatusChange}
            disabled={!receiveStatus}
          >
            확인
          </Button>
        </Row>
      </StyledReceivedStatusChangeModal>
    </BlurBackground>
  );
};

export default ReceiveStatusChangeModal;

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

const StyledReceivedStatusChangeModal = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 720px;
  height: 350px;
  padding: 36px;
  border-radius: 16px;
  background: ${color.white};
`;

const CardRadioBox = styled.div<{
  checked: boolean;
  $color: string;
  backgroundColor: string;
}>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  flex: 1;
  cursor: pointer;
  border: 1px solid;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  height: 80px;

  ${({ checked, $color, backgroundColor }) =>
    checked
      ? {
          backgroundColor: backgroundColor,
          borderColor: $color,
        }
      : {
          backgroundColor: 'inherit',
          borderColor: color.gray200,
        }}
`;
