import TableHeader from '@/components/common/TableHeader/TableHeader';
import { Row, Text } from '@maru/ui';

const FormTableHeader = () => {
  return (
    <TableHeader>
      <Row gap={48}>
        <Text fontType="p2" width={60}>
          번호
        </Text>
        <Text fontType="p2" width={60}>
          번호
        </Text>
        <Text fontType="p2" width={160}>
          번호
        </Text>
        <Text fontType="p2" width={240}>
          제목
        </Text>
      </Row>
      <Row gap={48}>
        <Text fontType="p2" width={60}>
          제출상태
        </Text>
        <Text fontType="p2" width={60}>
          제출서류
        </Text>
        <Text fontType="p2" width={60}>
          1차 결과
        </Text>
        <Text fontType="p2" width={60}>
          최종 점수
        </Text>
        <Text fontType="p2" width={60}>
          2차 결과
        </Text>
      </Row>
    </TableHeader>
  );
};

export default FormTableHeader;
