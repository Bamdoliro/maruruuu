import { useUploadedNoticeFileStore } from '@/store';
import { color } from '@maru/design-system';
import { IconClose } from '@maru/icon';
import { Button, Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import styled from '@emotion/styled';

interface Props {
  isOpen: boolean;
}

const MAX_FILE_SIZE = 2 * 10 * 1024 * 1024;

const NoticeUploader = ({ isOpen }: Props) => {
  const [uploadedFile, setUploadedFile] = useUploadedNoticeFileStore();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && uploadedFile) {
      setUploadedFile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, setUploadedFile]);

  const handleUploadCancelButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setUploadedFile(null);
  };

  const handleDragState = (e: DragEvent<HTMLDivElement>, isEntering: boolean) => {
    e.preventDefault();
    setIsDragging(isEntering);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile) return;
    validateAndSetFile(droppedFile);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      alert('20MB 이하 파일만 업로드할 수 있습니다.');
      return;
    }
    setUploadedFile(file);
  };

  return (
    <StyledNoticeUploader
      onDragEnter={(e) => handleDragState(e, true)}
      onDragLeave={(e) => handleDragState(e, false)}
      onDragOver={onDragOver}
      onDrop={onDrop}
      isDragging={isDragging}
    >
      <Column gap={12} alignItems="center">
        {uploadedFile ? (
          <FileNameBox>
            <Text fontType="p2" color={color.gray900}>
              {uploadedFile.name}
            </Text>
            <IconClose
              width={18}
              height={18}
              cursor="pointer"
              onClick={handleUploadCancelButtonClick}
            />
          </FileNameBox>
        ) : (
          <>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden />
            <Button size="SMALL" onClick={() => fileInputRef.current?.click()}>
              파일 선택
            </Button>
            <Text fontType="p2" color={color.gray500}>
              또는
            </Text>
            <Text fontType="p2" color={color.gray500}>
              여기로 파일을 끌어오세요
            </Text>
          </>
        )}
      </Column>
    </StyledNoticeUploader>
  );
};

export default NoticeUploader;

const StyledNoticeUploader = styled.div<{ isDragging: boolean }>`
  ${flex({ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' })};
  border: 1px dashed ${(props) => (props.isDragging ? color.maruDefault : color.gray400)};
  height: 240px;
  border-radius: 6px;
  background: ${color.gray50};
`;

const FileNameBox = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
  gap: 12px;
  height: 36px;
  padding: 0 8px 0 12px;
  border-radius: 6px;
  background: ${color.gray200};
`;
