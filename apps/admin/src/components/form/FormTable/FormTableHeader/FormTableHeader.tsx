import TableHeader from '@/components/common/TableHeader/TableHeader';
import { useSetFormToPrintStore } from '@/store/form/formToPrint';
import { useIsFormToPrintSelectingValueStore } from '@/store/form/isFormToPrintSelecting';
import { useIsSecondRoundResultEditingValueStore } from '@/store/form/isSecondRoundResultEditing';
import { convertToResponsive } from '@/utils';
import { CheckBox, Row, Text } from '@maru/ui';
import type { ChangeEventHandler } from 'react';

interface FormTableHeaderProps {
  id: number[];
}

const FormTableHeader = ({ id }: FormTableHeaderProps) => {
  const isSecondRoundResultEditing = useIsSecondRoundResultEditingValueStore();
  const isFormToPrintSelecting = useIsFormToPrintSelectingValueStore();

  const setFormToPrint = useSetFormToPrintStore();

  const handleAllFormToPrintSelectChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;

    if (!id) return;

    id?.forEach((formId) => {
      setFormToPrint((prev) => ({ ...prev, [formId]: checked }));
    });
  };

  return (
    <TableHeader>
      <Row gap={48}>
        {isFormToPrintSelecting ? (
          <CheckBox onChange={handleAllFormToPrintSelectChange} />
        ) : null}
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
      <Row gap={48} justifyContent="flex-end">
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
      </Row>
      <Text
        fontType="p2"
        width={isSecondRoundResultEditing ? 100 : convertToResponsive(40, 60)}
      >
        2차 결과
      </Text>
    </TableHeader>
  );
};

export default FormTableHeader;
