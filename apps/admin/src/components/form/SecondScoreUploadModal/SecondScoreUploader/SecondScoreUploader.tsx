import { useSecondScoreFileStore } from '@/store/form/secondScoreFile';
import { color } from '@maru/design-system';
import { IconClose } from '@maru/icon';
import { Button, Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useEffect, useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import styled from 'styled-components';

interface SecondScoreUploaderProps {
  isOpen: boolean;
}

const SecondScoreUploader = ({ isOpen }: SecondScoreUploaderProps) => {
  const [uploadedFile, setUploadedFile] = useSecondScoreFileStore();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && uploadedFile) {
      setUploadedFile(null);
    }
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
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile) return;
    setUploadedFile(droppedFile);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    setUploadedFile(file);
  };

  return (
    <StyledSecondScoreUploader
      onDragEnter={(e) => handleDragState(e, true)}
      onDragLeave={(e) => handleDragState(e, false)}
      onDragOver={(e) => e.preventDefault()}
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
    </StyledSecondScoreUploader>
  );
};

export default SecondScoreUploader;

const StyledSecondScoreUploader = styled.div<{ isDragging: boolean }>`
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
