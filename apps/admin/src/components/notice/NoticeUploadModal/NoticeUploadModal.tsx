import { color } from '@maru/design-system';
import { IconClose } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import NoticeUploader from './NoticeUploader/NoticeUploader';
import { useNoticeFileStore, useUploadedNoticeFileStore } from '@/store';
import { useEffect } from 'react';
import type { ChangeEventHandler } from 'react';

interface NoticeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileAttach: (file: File | null) => void;
}

const NoticeUploadModal = ({ isOpen, onClose, onFileAttach }: NoticeUploadModalProps) => {
  const [fileData, setFileData] = useNoticeFileStore();
  const [uploadedFile, setUploadedFile] = useUploadedNoticeFileStore();

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
    onFileAttach(null);
    onClose();
  };

  const handleAttachFile = () => {
    if (!uploadedFile) return;
    onFileAttach(uploadedFile);
    setFileData(fileData ? [...fileData, uploadedFile] : [uploadedFile]);
    onClose();
  };

  return (
    <BlurBackground isOpen={isOpen}>
      <StyledNoticeUploadModal>
        <Row justifyContent="space-between">
          <Column gap={8}>
            <Text fontType="H2" color={color.gray900}>
              파일 첨부
            </Text>
            <Text fontType="p3" color={color.gray600}>
              크기 20MB 이내 파일 1개만 첨부 가능합니다.
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
        <NoticeUploader isOpen={isOpen} />
        <Row justifyContent="flex-end" alignItems="flex-start" gap="16px">
          <Button size="SMALL" styleType="SECONDARY" onClick={handleCloseModal}>
            취소
          </Button>
          <Button
            size="SMALL"
            styleType={uploadedFile ? 'PRIMARY' : 'DISABLED'}
            onClick={handleAttachFile}
          >
            첨부
          </Button>
        </Row>
      </StyledNoticeUploadModal>
      <input type="file" onChange={handleFileDataChange} hidden />
    </BlurBackground>
  );
};

export default NoticeUploadModal;

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

const StyledNoticeUploadModal = styled.div`
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
