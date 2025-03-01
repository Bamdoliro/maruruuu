import { Dropdown, Td } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useSubjectIncompleteValueStore, useSubjectListValueStore } from '@/stores';
import { useInput } from './BasicCalculatorItem.hook';

interface Props {
  id: number;
  achievementLevels: string[];
  isError?: boolean[];
}

const BasicCalculatorItem = ({ id, achievementLevels, isError = [] }: Props) => {
  const subjectList = useSubjectListValueStore();
  const subjectIncomplete = useSubjectIncompleteValueStore();
  const { handleSubjectChange } = useInput(id);

  const subject = subjectList[id];

  const getDisplayValue = (value: string | null, incomplete: boolean | null) => {
    if (value === null || (incomplete && value === 'C')) return '미이수';
    return value;
  };

  return (
    <StyledBasicCalculatorItem>
      <Td styleType="SECONDARY" width="15.3%" height={64}>
        {subject.subjectName}
      </Td>
      <Td width="24%" height={64}>
        <Dropdown
          value={getDisplayValue(
            subject.achievementLevel21,
            subjectIncomplete[subject.subjectName]?.isIncomplete21
          )}
          size="SMALL"
          data={achievementLevels}
          width={80}
          onChange={handleSubjectChange}
          name="achievementLevel21"
          isError={subject.achievementLevel21 === '-' && isError[id]}
        />
      </Td>
      <Td width="24%" height={64}>
        <Dropdown
          value={getDisplayValue(
            subject.achievementLevel22,
            subjectIncomplete[subject.subjectName]?.isIncomplete22
          )}
          size="SMALL"
          data={achievementLevels}
          width={80}
          onChange={handleSubjectChange}
          name="achievementLevel22"
          isError={subject.achievementLevel22 === '-' && isError[id]}
        />
      </Td>
      <Td width="24%" height={64}>
        <Dropdown
          value={getDisplayValue(
            subject.achievementLevel31,
            subjectIncomplete[subject.subjectName]?.isIncomplete31
          )}
          size="SMALL"
          data={achievementLevels}
          width={80}
          onChange={handleSubjectChange}
          name="achievementLevel31"
          isError={subject.achievementLevel31 === '-' && isError[id]}
        />
      </Td>
      <Td width="15%" height={64}>
        {null}
      </Td>
    </StyledBasicCalculatorItem>
  );
};

export default BasicCalculatorItem;

const StyledBasicCalculatorItem = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 100%;
`;
