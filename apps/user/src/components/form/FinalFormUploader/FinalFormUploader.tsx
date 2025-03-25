import { color } from '@maru/design-system';
import { Button, Row, Text } from '@maru/ui';

interface FinalFormUploaderProps {
  onClick: () => void;
  fileName: string;
}

const FinalFormUploader = ({ onClick, fileName }: FinalFormUploaderProps) => {
  return (
    <Row gap={16} alignItems="center" style={{ margin: '168px 0 56px 0' }}>
      <Button onClick={onClick} size="SMALL">
        제출 서류 업로드
      </Button>
      <Text fontType="p2" color={color.gray900}>
        {fileName || '선택된 파일 없음'}
      </Text>
    </Row>
  );
};

export default FinalFormUploader;
