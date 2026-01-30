import type { ExportExcelType } from '@/types/form/client';
import { color } from '@maru/design-system';
import { IconClose } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useExportExcelAction } from './exportExcelModal.hooks';
import { EXPORT_EXCEL_TYPE } from '@/constants/form/constant';

interface ExportExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportExcelModal = ({ isOpen, onClose }: ExportExcelModalProps) => {
  const [exportExcelType, setExportExcelType] =
    useState<ExportExcelType>('전체 내보내기');

  const handleExportExcelTypeRadioChagne: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setExportExcelType(value as ExportExcelType);
  };

  const { handleExportExcelButtonClick } = useExportExcelAction(exportExcelType);

  return (
    <BlurBackground isOpen={isOpen}>
      <StyledExportExcelModal>
        <Row justifyContent="space-between">
          <Column gap={8}>
            <Text fontType="H2" color={color.gray900}>
              엑셀 내보내기
            </Text>
            <Text fontType="p3" color={color.gray600}>
              무슨 명단을 엑셀로 내보내실 건가요?
            </Text>
          </Column>
          <IconClose
            width={36}
            height={36}
            color={color.gray600}
            cursor="pointer"
            onClick={onClose}
          />
        </Row>
        <Row justifyContent="space-between" gap={12}>
          {EXPORT_EXCEL_TYPE.map((type) => (
            <CardRadioBox checked={exportExcelType === type}>
              <Text
                fontType="context"
                color={exportExcelType === type ? color.maruDefault : color.gray600}
              >
                {type}
              </Text>
              <input
                type="radio"
                name="exportExcelType"
                value={type}
                onChange={handleExportExcelTypeRadioChagne}
                hidden
              />
            </CardRadioBox>
          ))}
        </Row>
        <Row gap={16} style={{ alignSelf: 'flex-end' }}>
          <Button size="SMALL" styleType="SECONDARY" onClick={onClose}>
            취소
          </Button>
          <Button
            size="SMALL"
            styleType={exportExcelType ? 'PRIMARY' : 'DISABLED'}
            onClick={handleExportExcelButtonClick}
          >
            내보내기
          </Button>
        </Row>
      </StyledExportExcelModal>
    </BlurBackground>
  );
};
export default ExportExcelModal;

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

const StyledExportExcelModal = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 720px;
  height: 350px;
  padding: 36px;
  border-radius: 16px;
  background: ${color.white};
`;

const CardRadioBox = styled.label<{ checked: boolean }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  height: 80px;
  width: 100%;
  padding: 12px 0px;
  background: ${color.white};
  border-radius: 12px;
  border: 1px solid ${color.gray200};

  ${({ checked }) =>
    checked &&
    css`
      background: ${color.maruLightBlue};
    `}
`;
