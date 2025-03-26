import TableHeader from '@/components/common/TableHeader/TableHeader';
import { Row, Text } from '@maru/ui';

const GraduatedAreaTableHeader = () => {
  return (
    <TableHeader>
      <Row gap={48}>
        <Text fontType="p2" width={50}>
          번호
        </Text>
        <Text fontType="p2" width={540}>
          이름
        </Text>
      </Row>
      <Row gap={100}>
        <Text fontType="p2" width={50}>
          출신 학교
        </Text>
        <Text fontType="p2">
          학교 위치
        </Text>
      </Row>
    </TableHeader>
  );
};

export default GraduatedAreaTableHeader;
