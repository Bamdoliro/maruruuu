import TableHeader from '@/components/common/TableHeader/TableHeader';
import { Row, Text } from '@maru/ui';

const FairTableHeader = () => {
  return (
    <TableHeader>
      <Row gap={48}>
        <Text fontType="p2" width={60}>
          이름
        </Text>
        <Text fontType="p2" width={60}>
          참석 인원
        </Text>
        <Text fontType="p2" width={60}>
          신청 유형
        </Text>
        <Text fontType="p2" width={293}>
          학교
        </Text>
      </Row>
      <Row gap={48}>
        <Text fontType="p2" width={120}>
          연락처
        </Text>
        <Text fontType="p2" width={120}>
          질문
        </Text>
      </Row>
    </TableHeader>
  );
};

export default FairTableHeader;
