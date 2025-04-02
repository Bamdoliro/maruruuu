import { color } from '@maru/design-system';
import { IconClose } from '@maru/icon';
import { Button, Column, Row, Text, TextButton } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import SecondScoreUploader from './SecondScoreUploader/SecondScoreUploader';
import { useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import { useSecondScoreFileStore } from '@/store/form/secondScoreFile';
import {
  useExportExcelAction,
  useUploadSecondScoreFormatAction,
} from './SecondScoreUploadModal.hooks';

interface SecondScoreUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecondScoreUploadModal = ({ isOpen, onClose }: SecondScoreUploadModalProps) => {
  const [uploadedFile, setUploadedFile] = useSecondScoreFileStore();

  const { handleExportSecondScoreFormatButtonClick } = useExportExcelAction();

  useEffect(() => {
    if (isOpen) {
      setUploadedFile(null);
    }
  }, [isOpen, setUploadedFile]);

  const handleFileDataChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleCloseModal = () => {
    setUploadedFile(null);
    onClose();
  };

  const { handleUploadSecondScoreFormatButtonClick } = useUploadSecondScoreFormatAction(
    uploadedFile,
    handleCloseModal
  );

  return (
    <BlurBackground isOpen={isOpen}>
      <StyledSecondScoreUploadModal>
        <Row justifyContent="space-between">
          <Column gap={8}>
            <Text fontType="H2" color={color.gray900}>
              2차 전형 점수 입력
            </Text>
            <Text fontType="p3" color={color.gray600}>
              .xlsx 형식의 파일을 업로드해주세요.
            </Text>
          </Column>
          <IconClose
            width={36}
            height={36}
            color={color.gray600}
            cursor="pointer"
            onClick={handleCloseModal}
          />
        </Row>
        <Column gap={16}>
          <SecondScoreUploader isOpen={isOpen} />
          <TextButton
            fontType="btn2"
            color={color.gray600}
            onClick={handleExportSecondScoreFormatButtonClick}
          >
            [ 엑셀 포맷 다운로드 ]
          </TextButton>
        </Column>
        <Row justifyContent="flex-end" alignItems="flex-start" gap="16px">
          <Button size="SMALL" styleType="SECONDARY" onClick={handleCloseModal}>
            취소
          </Button>
          <Button
            size="SMALL"
            styleType={uploadedFile ? 'PRIMARY' : 'DISABLED'}
            onClick={handleUploadSecondScoreFormatButtonClick}
          >
            입력하기
          </Button>
        </Row>
      </StyledSecondScoreUploadModal>
      <input type="file" accept=".xlsx" onChange={handleFileDataChange} hidden />
    </BlurBackground>
  );
};

export default SecondScoreUploadModal;

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

const StyledSecondScoreUploadModal = styled.div`
  ${flex({
    flexDirection: 'column',
    justifyContent: 'space-between',
  })}
  width: 720px;
  height: 540px;
  padding: 36px;
  border-radius: 16px;
  background: ${color.white};
`;
