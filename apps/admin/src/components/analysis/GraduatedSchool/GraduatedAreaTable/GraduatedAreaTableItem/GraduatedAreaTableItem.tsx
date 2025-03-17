import TableItem from '@/components/common/TableItem/TableItem';
import { Row, Text } from '@maru/ui';

interface NoticeTableItemProps {
  id: number;
  title: string;
  school: string;
  location: string;
}

const GraduatedAreaTableItem = ({
  id,
  title,
  school,
  location,
}: NoticeTableItemProps) => {
  return (
    <TableItem key={id}>
      <Row gap={48}>
        <Text fontType="p2" width={50}>
          {id}
        </Text>
        <Text fontType="p2" width={1}>
          {title}
        </Text>
      </Row>
      <Row gap={140}>
        <Text fontType="p2" width={50}>
          {school}
        </Text>
        <Text fontType="p2">{location}</Text>
      </Row>
    </TableItem>
  );
};

export default GraduatedAreaTableItem;
