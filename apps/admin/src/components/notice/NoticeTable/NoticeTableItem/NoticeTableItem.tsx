import { TableItem } from '@/components/common';
import { Row, Text } from '@maru/ui';

interface NoticeTableItemProps {
  id: number;
  title: string;
  updatedAt: string;
}

const NoticeTableItem = ({ id, title, updatedAt }: NoticeTableItemProps) => {
  return (
    <TableItem key={id}>
      <Row gap={48}>
        <Text fontType="p2" width={50}>
          {id}
        </Text>
        <Text fontType="p2" width={540}>
          {title}
        </Text>
      </Row>
      <Text fontType="p2" width={100}>
        {updatedAt}
      </Text>
    </TableItem>
  );
};

export default NoticeTableItem;
