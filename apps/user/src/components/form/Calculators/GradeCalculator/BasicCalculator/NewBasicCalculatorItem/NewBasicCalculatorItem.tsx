import { Button, Dropdown, Td } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { SUBJECT_LIST } from '@/constants/form/data';
import { useNewSubjectListValueStore } from '@/stores';
import color from '@maru/design-system/src/color';
import { font } from '@maru/design-system';
import { useDeleteNewSubject, useInput } from './NewBasicCalculatorItem.hook';

interface Props {
  id: number;
  achievementLevels: string[];
  isError?: boolean[];
}

const NewBasicCalculatorItem = ({ id, achievementLevels, isError = [] }: Props) => {
  const newSubjectList = useNewSubjectListValueStore();
  const newSubjectIndex = newSubjectList.findIndex((item) => item.id === id);

  const { handleNewSubjectChange, handleNewSubjectNameChange } =
    useInput(newSubjectIndex);
  const { handleDeleteNewSubject } = useDeleteNewSubject();

  const subject = newSubjectList[newSubjectIndex];

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
      <Td width="24%" height={64}>
        <Dropdown
          value={subject.achievementLevel21 ?? '미이수'}
          size="SMALL"
          data={achievementLevels}
          width={80}
          name="achievementLevel21"
          onChange={handleNewSubjectChange}
          isError={subject.achievementLevel21 === '-' && (isError[id] ?? false)}
          disabled={isDropdownDisabled}
        />
      </Td>
      <Td width="24%" height={64}>
        <Dropdown
          value={subject.achievementLevel22 ?? '미이수'}
          size="SMALL"
          data={achievementLevels}
          width={80}
          name="achievementLevel22"
          onChange={handleNewSubjectChange}
          isError={subject.achievementLevel22 === '-' && isError[id]}
          disabled={isDropdownDisabled}
        />
      </Td>
      <Td width="24%" height={64}>
        <Dropdown
          value={subject.achievementLevel31 ?? '미이수'}
          size="SMALL"
          data={achievementLevels}
          width={80}
          name="achievementLevel31"
          onChange={handleNewSubjectChange}
          isError={subject.achievementLevel31 === '-' && isError[id]}
          disabled={isDropdownDisabled}
        />
      </Td>
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
