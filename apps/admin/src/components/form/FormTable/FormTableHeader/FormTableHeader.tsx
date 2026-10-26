import TableHeader from '@/components/common/TableHeader/TableHeader';
import {
  formListSortingTypeAtom,
  formToPrintAtom,
  isFormToPrintSelectingAtom,
  isSecondRoundResultEditingAtom,
} from '@/store';
import { useAtomValue, useSetAtom } from 'jotai';
import { convertToResponsive } from '@/utils';
import { CheckBox, Row, Text } from '@maru/ui';
import type { ChangeEventHandler } from 'react';
import styled from '@emotion/styled';

interface FormTableHeaderProps {
  id: number[];
}

const FormTableHeader = ({ id }: FormTableHeaderProps) => {
  const isSecondRoundResultEditing = useAtomValue(isSecondRoundResultEditingAtom);
  const isFormToPrintSelecting = useAtomValue(isFormToPrintSelectingAtom);
  const { sort } = useAtomValue(formListSortingTypeAtom);
  const isFirstRoundScoreSort =
    sort === 'first-round-score-desc' || sort === 'first-round-score-asc';

  const setFormToPrint = useSetAtom(formToPrintAtom);

  const handleAllFormToPrintSelectChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;

    if (!id) return;

    id?.forEach((formId) => {
      setFormToPrint((prev) => ({ ...prev, [formId]: checked }));
    });
  };

  return (
    <TableHeader>
      <Row gap={40}>
        {isFormToPrintSelecting ? (
          <CheckBox onChange={handleAllFormToPrintSelectChange} />
        ) : null}
        <ListNumberSpace />
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          수험번호
        </Text>
        <Text fontType="p2" width={convertToResponsive(60, 80)}>
          이름
        </Text>
        <Text fontType="p2" width={convertToResponsive(120, 160)}>
          학교
        </Text>
        <Text fontType="p2" width={convertToResponsive(100, 160)}>
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
          {isFirstRoundScoreSort ? '1차 점수' : '최종 점수'}
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

const ListNumberSpace = styled.div`
  width: ${convertToResponsive(12, 20)};
`;
