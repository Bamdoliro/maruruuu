import { TableItem } from '@/components/common';
import { ROUTES } from '@/constants/common/constant';
import { FORM_TYPE_CATEGORY } from '@/constants/form/constant';
import { useFormToPrintStore } from '@/store/form/formToPrint';
import { useIsFormToPrintSelectingValueStore } from '@/store/form/isFormToPrintSelecting';
import { useIsSecondRoundResultEditingValueStore } from '@/store/form/isSecondRoundResultEditing';
import { useSecondRoundResultStore } from '@/store/form/secondRoundResult';
import type { Form, PassStatusType } from '@/types/form/client';
import { convertToResponsive, maskName } from '@/utils';
import { color } from '@maru/design-system';
import { CheckBox, Dropdown, Row, Text } from '@maru/ui';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useState } from 'react';
import { styled } from 'styled-components';

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
  const router = useRouter();

  const isSecondRoundResultEditing = useIsSecondRoundResultEditingValueStore();
  const [secondRoundResult, setSecondRoundResult] = useSecondRoundResultStore();

  const [isHovered, setIsHovered] = useState(false);

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

  const isDisabled = isSecondRoundResultEditing || isFormToPrintSelecting;
  const handleMoveFormDetailPage = () => {
    if (isDisabled) return;
    router.push(`${ROUTES.FORM}/${id}`);
  };

  return (
    <DirectButton
      style={{
        cursor: isDisabled ? 'default' : 'pointer',
      }}
      onClick={handleMoveFormDetailPage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TableItem key={id}>
        <Row gap={48}>
          {isFormToPrintSelecting ? (
            <CheckBox
              checked={formToPrint[id]}
              onChange={handleFormToPrintSelectChange}
            />
          ) : null}
          <Text fontType="p2" width={convertToResponsive(40, 60)}>
            {examinationNumber}
          </Text>
          <Text fontType="p2" width={convertToResponsive(40, 60)}>
            {isHovered ? name : maskName(name)}
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
    </DirectButton>
  );
};

export default FormTableItem;

const DirectButton = styled.button`
  text-align: start;
`;
