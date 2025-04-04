import TableHeader from '@/components/common/TableHeader/TableHeader';
import { convertToResponsive } from '@/utils';
import { Row, Text } from '@maru/ui';

const FormTableHeader = () => {
  return (
    <TableHeader>
      <Row gap={48}>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          수험번호
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          이름
        </Text>
        <Text fontType="p2" width={convertToResponsive(120, 160)}>
          학교
        </Text>
        <Text fontType="p2" width={convertToResponsive(180, 240)}>
          전형
        </Text>
      </Row>
      <Row gap={48}>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          제출상태
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          제출서류
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          1차 결과
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          최종 점수
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          2차 결과
        </Text>
      </Row>
    </TableHeader>
  );
};

export default FormTableHeader;
