import { TableItem } from '@/components/common';
import { FORM_TYPE_CATEGORY } from '@/constants/form/constant';
import { useFormToPrintStore } from '@/store/form/formToPrint';
import { useIsFormToPrintSelectingValueStore } from '@/store/form/isFormToPrintSelecting';
import { useIsSecondRoundResultEditingValueStore } from '@/store/form/isSecondRoundResultEditing';
import { useSecondRoundResultStore } from '@/store/form/secondRoundResult';
import type { Form, PassStatusType } from '@/types/form/client';
import { convertToResponsive } from '@/utils';
import { color } from '@maru/design-system';
import { CheckBox, Dropdown, Row, Text } from '@maru/ui';
import type { ChangeEventHandler } from 'react';

const FormTableItem = ({
  id,
  examinationNumber,
  name,
  graduationType,
  school,
  status,
  type,
  totalScore,
  firstRoundPassed,
  secondRoundPassed,
}: Form) => {
  const isSecondRoundResultEditing = useIsSecondRoundResultEditingValueStore();
  const [secondRoundResult, setSecondRoundResult] = useSecondRoundResultStore();

  const handleSecondPassResultDropdownChange = (value: string) => {
    setSecondRoundResult((prev) => ({
      ...prev,
      [id]: value as PassStatusType,
    }));
  };

  const getStatusColor = (status: boolean | null) => {
    if (status === null) return color.gray600;
    return status ? color.maruDefault : color.red;
  };

  const getRoundResult = (roundPassed: boolean | null, FormStatus?: string) => {
    if (FormStatus === 'NO_SHOW') {
      return '불참';
    }
    return roundPassed === null ? '미정' : roundPassed ? '합격' : '불합격';
  };

  const isFormToPrintSelecting = useIsFormToPrintSelectingValueStore();

  const [formToPrint, setFormToPrint] = useFormToPrintStore();

  const handleFormToPrintSelectChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;
    setFormToPrint((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <TableItem key={id}>
      <Row gap={48}>
        {isFormToPrintSelecting ? (
          <CheckBox checked={formToPrint[id]} onChange={handleFormToPrintSelectChange} />
        ) : null}
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
          {FORM_TYPE_CATEGORY[type]}
        </Text>
      </Row>
      <Row gap={48} justify-content="flex-end">
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
          {getRoundResult(firstRoundPassed)}
        </Text>
        <Text
          fontType="p2"
          width={convertToResponsive(40, 60)}
          color={typeof totalScore !== 'number' ? color.gray600 : color.black}
        >
          {typeof totalScore !== 'number' ? '미정' : Number(totalScore.toFixed(3))}
        </Text>
      </Row>
      <Row>
        {isSecondRoundResultEditing ? (
          <Dropdown
            name="pass"
            size="SMALL"
            width={100}
            value={secondRoundResult[id] || getRoundResult(secondRoundPassed, status)}
            data={['합격', '불합격']}
            onChange={handleSecondPassResultDropdownChange}
          />
        ) : (
          <Text
            fontType="p2"
            width={convertToResponsive(40, 60)}
            color={getStatusColor(secondRoundPassed)}
          >
            {getRoundResult(secondRoundPassed, status)}
          </Text>
        )}
      </Row>
    </TableItem>
  );
};

export default FormTableItem;
