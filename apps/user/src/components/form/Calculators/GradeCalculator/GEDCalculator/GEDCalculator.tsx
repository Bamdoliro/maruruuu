import styled from 'styled-components';
import GEDCalculatorHeader from './GEDCalculatorHeader/GEDCalculatorHeader';
import { useEffect } from 'react';
import {
  useGEDSubjectListValueStore,
  useNewGEDSubjectListValueStore,
  useSetFormStore,
} from '@/stores';
import { useAddNewGEDSubject } from './GEDCalculator.hook';
import GEDCalculatorItem from './GEDCalculatorItem/GEDCalculatorItem';
import { Button } from '@maru/ui';
import { flex } from '@maru/utils';
import { color } from '@maru/design-system';
import NewGEDCalculatorItem from './NewGEDCalculatorItem/NewGEDCalculatorItem';

const GEDCalculator = () => {
  const newGEDSubjectList = useNewGEDSubjectListValueStore();
  const GEDSubjectList = useGEDSubjectListValueStore();
  const setForm = useSetFormStore();
  const { handleAddNewGEDSubject } = useAddNewGEDSubject();

  useEffect(() => {
    const studentSubjectList = [...GEDSubjectList, ...newGEDSubjectList].map(
      ({ id, ...rest }) => rest
    );
    setForm((prev) => ({
      ...prev,
      grade: { ...prev.grade, subjectList: studentSubjectList },
    }));
  }, [GEDSubjectList, newGEDSubjectList, setForm]);

  return (
    <StyledGEDCalculator>
      <GEDCalculatorHeader />
      {GEDSubjectList.map(({ id, subjectName, score }) => (
        <GEDCalculatorItem id={id} subject={subjectName} score={score} />
      ))}
      {newGEDSubjectList.map(({ id, score }) => (
        <NewGEDCalculatorItem id={id} score={score} />
      ))}
      <GEDCalculatorFooter>
        <Button onClick={handleAddNewGEDSubject} icon="ADD_ICON" size="SMALL">
          과목추가
        </Button>
      </GEDCalculatorFooter>
    </StyledGEDCalculator>
  );
};

export default GEDCalculator;

const StyledGEDCalculator = styled.div`
  width: 100%;
  height: 100%;
`;

const GEDCalculatorFooter = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 100%;
  height: 64px;
  background-color: ${color.gray100};
  border-radius: 0px 0px 12px 12px;
  border: 1px dashed ${color.gray300};
  border-top: none;
`;
