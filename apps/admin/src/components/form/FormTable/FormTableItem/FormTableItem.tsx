import { TableItem } from '@/components/common';
import { Row, Text } from '@maru/ui';

const FormTableItem = () => {
  return (
    <TableItem key={1}>
      <Row gap={48}>
        <Text fontType="p2" width={60}>
          1001
        </Text>
        <Text fontType="p2" width={60}>
          이민준
        </Text>
        <Text fontType="p2" width={160}>
          재송중학교
        </Text>
        <Text fontType="p2" width={240}>
          일반
        </Text>
      </Row>
      <Row gap={48}>
        <Text fontType="p2" width={60}>
          최종 제출
        </Text>
        <Text fontType="p2" width={60}>
          승인
        </Text>
        <Text fontType="p2" width={60}>
          합격
        </Text>
        <Text fontType="p2" width={60}>
          220.00
        </Text>
        <Text fontType="p2" width={60}>
          합격
        </Text>
      </Row>
    </TableItem>
  );
};

export default FormTableItem;
