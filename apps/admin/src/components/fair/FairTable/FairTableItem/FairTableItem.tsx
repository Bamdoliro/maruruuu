import { TableItem } from '@/components/common';
import { formatPhoneNumber } from '@/utils';
import { Row, Text } from '@maru/ui';

interface FairTableItemProps {
  schoolName: string;
  name: string;
  type: string;
  phoneNumber: string;
  headcount: number;
  question: string;
}

const FairTableItem = ({
  schoolName,
  name,
  type,
  phoneNumber,
  headcount,
  question,
}: FairTableItemProps) => {
  return (
    <TableItem>
      <Row gap={48}>
        <Text fontType="p2" width={60}>
          {name}
        </Text>
        <Text fontType="p2" width={60}>
          {headcount}
        </Text>
        <Text fontType="p2" width={60}>
          {type}
        </Text>
        <Text fontType="p2" width={293}>
          {schoolName}
        </Text>
      </Row>
      <Row gap={48}>
        <Text fontType="p2" width={120}>
          {formatPhoneNumber(phoneNumber)}
        </Text>
        <Text fontType="p2" width={120}>
          {question}
        </Text>
      </Row>
    </TableItem>
  );
};

export default FairTableItem;
