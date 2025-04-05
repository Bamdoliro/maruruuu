import { TableItem } from '@/components/common';
import { Form } from '@/types/form/client';
import { convertToResponsive } from '@/utils';
import { color } from '@maru/design-system';
import { Row, Text } from '@maru/ui';

interface FormTableItemProps {
  id: number;
  examinationNumber: number | null;
  name: string;
  graduationType: string;
  school: string;
  status: string;
  type: string;
  isChangedToRegular: boolean;
  totalScore: number | null;
  firstRoundPassed: boolean | null;
  secondRoundPassed: boolean | null;
}

const FormTableItem = ({
  id,
  examinationNumber,
  name,
  graduationType,
  school,
  status,

  totalScore,
  firstRoundPassed,
  secondRoundPassed,
}: Form) => {
  const getStatusColor = (status: boolean | null) => {
    if (status === null) return color.gray600;
    return status ? color.maruDefault : color.red;
  };

  return (
    <TableItem key={id}>
      <Row gap={48}>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          {examinationNumber}
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          {name}
        </Text>
        <Text fontType="p2" width={convertToResponsive(120, 160)}>
          {graduationType === 'QUALIFICATION_EXAMINATION' ? '검정고시' : school}
        </Text>
        <Text fontType="p2" width={convertToResponsive(180, 240)}>
          {graduationType}
        </Text>
      </Row>
      <Row gap={48}>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          {status === 'SUBMITTED' ? '초안 제출' : '최종 제출'}
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          승인
        </Text>
        <Text
          fontType="p2"
          width={convertToResponsive(40, 60)}
          color={getStatusColor(firstRoundPassed)}
        >
          합격
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          {typeof totalScore !== 'number' ? '미정' : Number(totalScore.toFixed(3))}
        </Text>
        <Text
          fontType="p2"
          width={convertToResponsive(40, 60)}
          color={getStatusColor(secondRoundPassed)}
        >
          합격
        </Text>
      </Row>
    </TableItem>
  );
};

export default FormTableItem;
