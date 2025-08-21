import TableHeader from '@/components/common/TableHeader/TableHeader';
import { Row, Text } from '@maru/ui';

const GraduatedAreaTableHeader = () => {
  return (
    <TableHeader>
      <Row gap={120}>
        <Row gap={480}>
          <Row gap={48}>
            <Text fontType="p2" width={50}>
              번호
            </Text>
            <Text fontType="p2" width={1}>
              이름
            </Text>
          </Row>
          <Text fontType="p2" width={50}>
            출신 학교
          </Text>
        </Row>
        <Text fontType="p2">학교 위치</Text>
      </Row>
    </TableHeader>
  );
};

export default GraduatedAreaTableHeader;
