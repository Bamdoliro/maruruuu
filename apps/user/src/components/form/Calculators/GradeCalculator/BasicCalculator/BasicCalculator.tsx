import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import BasicCalculatorHeader from './BasicCalculatorHeader/BasicCalculatorHeader';
import BasicCalculatorItem from './BasicCalculatorItem/BasicCalculatorItem';
import {
  useNewSubjectListValueStore,
  useSetFormStore,
  useSubjectListValueStore,
} from '@/stores';
import { color } from '@maru/design-system';
import { useEffect } from 'react';
import { Button } from '@maru/ui';
import { useAddNewSubject } from './BasicCalculator.hook';
import NewBasicCalculatorItem from './NewBasicCalculatorItem/NewBasicCalculatorItem';

interface BasicCalculatorProps {
  subjectError?: boolean[];
  newSubjectError?: boolean[];
}

const BasicCalculator = ({ subjectError, newSubjectError }: BasicCalculatorProps) => {
  const newSubjectList = useNewSubjectListValueStore();
  const subjectList = useSubjectListValueStore();
  const setForm = useSetFormStore();
  const { handleAddNewSubject } = useAddNewSubject();

  useEffect(() => {
    const studentSubjectList = [...subjectList, ...newSubjectList].map(
      ({ id, ...rest }) => rest
    );

    setForm((prev) => ({
      ...prev,
      grade: { ...prev.grade, subjectList: studentSubjectList },
    }));
  }, [newSubjectList, setForm, subjectList]);

  return (
    <StyledBasicCalculator>
      <BasicCalculatorHeader />
      {subjectList.map(({ id, subjectName }) => {
        const isSpecialSubject =
          subjectName === '미술' || subjectName === '음악' || subjectName === '체육';

        return (
          <BasicCalculatorItem
            id={id}
            key={`subject ${id}`}
            achievementLevels={
              isSpecialSubject
                ? ['미이수', 'A', 'B', 'C']
                : ['미이수', 'A', 'B', 'C', 'D', 'E']
            }
            isError={subjectError}
          />
        );
      })}
      {newSubjectList.map(({ id }) => (
        <NewBasicCalculatorItem
          id={id}
          achievementLevels={['미이수', 'A', 'B', 'C', 'D', 'E']}
          isError={newSubjectError}
        />
      ))}
      <GradeCalculatorFooter>
        <Button onClick={handleAddNewSubject} icon="ADD_ICON" size="SMALL">
          과목추가
        </Button>
      </GradeCalculatorFooter>
    </StyledBasicCalculator>
  );
};

export default BasicCalculator;

const StyledBasicCalculator = styled.div`
  ${flex({ flexDirection: 'column' })};
  width: 100%;
  height: 100%;
`;

const GradeCalculatorFooter = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 100%;
  height: 64px;
  background-color: ${color.gray100};
  border-radius: 0px 0px 12px 12px;
  border: 1px dashed ${color.gray300};
  border-top: none;
`;
