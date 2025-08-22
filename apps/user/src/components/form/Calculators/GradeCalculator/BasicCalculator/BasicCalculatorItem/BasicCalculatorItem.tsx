import { Dropdown, Td } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useSubjectListValueStore } from '@/stores';
import { useInput } from './BasicCalculatorItem.hook';
import type { Subject } from '@/types/form/client';

interface Props {
  id: number;
  achievementLevels: string[];
  isError?: boolean[];
}

const ACHIEVEMENT_KEYS: (keyof Subject)[] = [
  'achievementLevel21',
  'achievementLevel22',
  'achievementLevel31',
];

const BasicCalculatorItem = ({ id, achievementLevels, isError = [] }: Props) => {
  const subjectList = useSubjectListValueStore();
  const { handleSubjectChange } = useInput(id);

  const subject = subjectList[id];

  const getDisplayValue = (value: string | number | null) => {
    if (value === null) return '미이수';
    return value as string;
  };

  return (
    <StyledBasicCalculatorItem>
      <Td styleType="SECONDARY" width="15.3%" height={64}>
        {subject.subjectName}
      </Td>
      {ACHIEVEMENT_KEYS.map((key) => (
        <Td key={key} width="24%" height={64}>
          <Dropdown
            value={getDisplayValue(subject[key])}
            size="SMALL"
            data={achievementLevels}
            width={80}
            onChange={handleSubjectChange}
            name={key}
            isError={subject[key] === '-' && isError[id]}
          />
        </Td>
      ))}
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
