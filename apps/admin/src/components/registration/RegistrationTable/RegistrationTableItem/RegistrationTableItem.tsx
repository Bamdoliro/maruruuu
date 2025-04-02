import { TableItem } from '@/components/common';
import { Button, Row, Text } from '@maru/ui';
import { handleFileDownload, handleFilePreview } from './RegistrationTableItem.hook';

interface FaqTableItemProps {
  examinationNumber: number;
  name: string;
  admissionAndPledgeUrl: string;
}

const RegistrationTableItem = ({
  examinationNumber,
  name,
  admissionAndPledgeUrl,
}: FaqTableItemProps) => {
  return (
    <TableItem key={examinationNumber}>
      <Row gap={60}>
        <Row gap={48}>
          <Text fontType="p2" width={50} ellipsis>
            {examinationNumber}
          </Text>
          <Text fontType="p2" width={400} ellipsis>
            {name}
          </Text>
        </Row>
      </Row>
      <Row gap={12}>
        <Button
          styleType="SECONDARY"
          size="SMALL"
          onClick={() => {
            handleFilePreview(admissionAndPledgeUrl);
          }}
        >
          파일 미리보기
        </Button>
        <Button
          styleType="PRIMARY"
          size="SMALL"
          onClick={() => {
            handleFileDownload(admissionAndPledgeUrl);
          }}
        >
          파일 다운로드
        </Button>
      </Row>
    </TableItem>
  );
};

export default RegistrationTableItem;
