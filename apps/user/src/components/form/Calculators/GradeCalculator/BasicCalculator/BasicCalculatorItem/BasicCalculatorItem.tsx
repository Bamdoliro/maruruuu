import { Dropdown, Td } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { subjectListAtom } from '@/stores';
import { useAtomValue } from 'jotai';
import { useInput } from './BasicCalculatorItem.hook';

interface Props {
  id: number;
  achievementLevels: string[];
  isError?: boolean[];
  isLast?: boolean;
}

const ACHIEVEMENT_KEYS = [
  'achievementLevel21',
  'achievementLevel22',
  'achievementLevel31',
] as const;

const BasicCalculatorItem = ({
  id,
  achievementLevels,
  isError = [],
  isLast = false,
}: Props) => {
  const subjectList = useAtomValue(subjectListAtom);
  const { handleSubjectChange } = useInput(id);

  const subject = subjectList[id];

  const getDisplayValue = (value: string) => {
    if (value === 'F') return '미이수';
    return value;
  };

  return (
    <StyledBasicCalculatorItem>
      <Td
        styleType="SECONDARY"
        width="25%"
        height={64}
        borderBottomLeftRadius={isLast ? 12 : undefined}
      >
        {subject.subjectName}
      </Td>
      {ACHIEVEMENT_KEYS.map((key, index) => (
        <Td
          key={key}
          width="25%"
          height={64}
          borderBottomRightRadius={
            isLast && index === ACHIEVEMENT_KEYS.length - 1 ? 12 : undefined
          }
        >
          <Dropdown
            value={getDisplayValue(subject[key])}
            size="SMALL"
            data={achievementLevels}
            width={96}
            onChange={handleSubjectChange}
            name={key}
            isError={subject[key] === '-' && isError[id]}
          />
        </Td>
      ))}
    </StyledBasicCalculatorItem>
  );
};

export default BasicCalculatorItem;

const StyledBasicCalculatorItem = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 100%;
`;
