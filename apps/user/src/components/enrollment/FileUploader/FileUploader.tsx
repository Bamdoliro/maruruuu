import { color } from '@maru/design-system';
import { Button, Row, Text } from '@maru/ui';
import { ChangeEventHandler, ForwardedRef } from 'react';

interface FileUploaderProps {
  onClick: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  document: string;
  ref: ForwardedRef<HTMLInputElement>;
}

const FileUploader = ({ onClick, onChange, document, ref }: FileUploaderProps) => {
  return (
    <>
      <Row gap={16} alignItems="center">
        <Button size="SMALL" onClick={onClick}>
          첨부파일 업로드
        </Button>
        <Text fontType="p2" color={color.gray900}>
          {document || '선택된 파일 없음'}
        </Text>
      </Row>
      <input ref={ref} onChange={onChange} type="file" accept=".pdf, .hwpx" hidden />
    </>
  );
};

FileUploader.displayName = 'FileUploader';

export default FileUploader;
