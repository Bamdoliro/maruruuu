import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import BasicCalculatorHeader from './BasicCalculatorHeader/BasicCalculatorHeader';
import BasicCalculatorItem from './BasicCalculatorItem/BasicCalculatorItem';
import InformationFirstGrade from './InformationFirstGrade/InformationFirstGrade';
import { formAtom, subjectListAtom } from '@/stores';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

interface BasicCalculatorProps {
  subjectError?: boolean[];
}

const ACHIEVEMENT_LEVELS = ['미이수', 'A', 'B', 'C', 'D', 'E'];

const BasicCalculator = ({ subjectError }: BasicCalculatorProps) => {
  const subjectList = useAtomValue(subjectListAtom);
  const setForm = useSetAtom(formAtom);

  useEffect(() => {
    const studentSubjectList = subjectList.map(({ ...rest }) => rest);

    setForm((prev) => ({
      ...prev,
      grade: { ...prev.grade, subjectList: studentSubjectList },
    }));
  }, [setForm, subjectList]);

  return (
    <StyledBasicCalculator>
      <InformationFirstGrade achievementLevels={ACHIEVEMENT_LEVELS} />
      <Table>
        <BasicCalculatorHeader />
        {subjectList.map(({ id }, index) => (
          <BasicCalculatorItem
            id={id}
            key={`subject ${id}`}
            achievementLevels={ACHIEVEMENT_LEVELS}
            isError={subjectError}
            isLast={index === subjectList.length - 1}
          />
        ))}
      </Table>
    </StyledBasicCalculator>
  );
};

export default BasicCalculator;

const StyledBasicCalculator = styled.div`
  ${flex({ flexDirection: 'column' })};
  gap: 24px;
  width: 100%;
  height: 100%;
`;

const Table = styled.div`
  ${flex({ flexDirection: 'column' })};
  width: 100%;
`;
