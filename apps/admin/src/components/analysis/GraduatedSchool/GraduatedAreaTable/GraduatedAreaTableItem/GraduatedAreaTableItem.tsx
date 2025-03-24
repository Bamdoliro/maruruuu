import TableItem from '@/components/common/TableItem/TableItem';
import { Row, Text } from '@maru/ui';

interface NoticeTableItemProps {
  id: number;
  applicantName: string;
  schoolName: string;
  schoolAddress: string;
}

const GraduatedAreaTableItem = ({
  id,
  applicantName,
  schoolName,
  schoolAddress,
}: NoticeTableItemProps) => {
  return (
    <TableItem key={id}>
      <Row gap={48}>
        <Text fontType="p2" width={50}>
          {id}
        </Text>
        <Text fontType="p2" width={1}>
          {applicantName}
        </Text>
      </Row>
      <Row gap={140}>
        <Text fontType="p2" width={50}>
          {schoolName}
        </Text>
        <Text fontType="p2">{schoolAddress}</Text>
      </Row>
    </TableItem>
  );
};

export default GraduatedAreaTableItem;
