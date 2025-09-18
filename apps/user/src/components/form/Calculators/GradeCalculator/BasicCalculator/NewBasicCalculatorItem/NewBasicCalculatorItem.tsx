import { Button, Dropdown, Td } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { SUBJECT_LIST } from '@/constants/form/data';
import { useNewSubjectListValueStore } from '@/stores';
import color from '@maru/design-system/src/color';
import { font } from '@maru/design-system';
import { useDeleteNewSubject, useInput } from './NewBasicCalculatorItem.hook';
import type { Subject } from '@/types/form/client';

interface NewBasicCalculatorItemProps {
  id: number;
  achievementLevels: string[];
  isError?: boolean[];
}

const ACHIEVEMENT_KEYS = [
  'achievementLevel21',
  'achievementLevel22',
  'achievementLevel31',
] as const;

const NewBasicCalculatorItem = ({
  id,
  achievementLevels,
  isError = [],
}: NewBasicCalculatorItemProps) => {
  const newSubjectList = useNewSubjectListValueStore();
  const newSubjectIndex = newSubjectList.findIndex((item) => item.id === id);

  const { handleNewSubjectChange, handleNewSubjectNameChange } =
    useInput(newSubjectIndex);
  const { handleDeleteNewSubject } = useDeleteNewSubject();

  const subject = newSubjectList[newSubjectIndex] as Subject;

  const isDropdownDisabled =
    !subject.subjectName ||
    SUBJECT_LIST.some(
      (listSubject) =>
        listSubject.subjectName.toLowerCase() === subject.subjectName?.toLowerCase()
    );

  const sameSubject = SUBJECT_LIST.some(
    (listSubject) =>
      listSubject.subjectName.toLowerCase() === subject.subjectName?.toLowerCase()
  );

  const getDisplayValue = (value: string) => {
    if (value === 'F') return '미이수';
    return value;
  };

  return (
    <StyledNewBasicCalculatorItem>
      <Td styleType="SECONDARY" width="15.3%" height={64}>
        <NewSubjectInput
          name="subjectName"
          onChange={handleNewSubjectNameChange}
          value={subject.subjectName || ''}
          placeholder="과목명 입력"
          error={sameSubject}
        />
      </Td>
      {ACHIEVEMENT_KEYS.map((key) => (
        <Td key={key} width="24%" height={64}>
          <Dropdown
            value={getDisplayValue(subject[key])}
            size="SMALL"
            data={achievementLevels}
            width={80}
            name={key}
            onChange={handleNewSubjectChange}
            isError={subject[key] === '-' && (isError[id] ?? false)}
            disabled={isDropdownDisabled}
          />
        </Td>
      ))}
      <Td width="15%" height={64}>
        <Button
          onClick={() => handleDeleteNewSubject(id)}
          styleType="DELETE"
          size="SMALL"
        >
          삭제
        </Button>
      </Td>
    </StyledNewBasicCalculatorItem>
  );
};

export default NewBasicCalculatorItem;

const StyledNewBasicCalculatorItem = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 100%;
`;

const NewSubjectInput = styled.input<{ error: boolean }>`
  ${font.p2}
  color: ${(props) => (props.error ? `${color.red}` : `${color.gray900}`)};
  background-color: ${color.gray50};
  width: 74px;
  text-align: center;
  &:-webkit-input-placeholder {
    color: ${color.gray500};
  }
`;
