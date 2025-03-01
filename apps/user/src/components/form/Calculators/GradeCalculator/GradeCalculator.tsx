import { useFormStore } from '@/stores';
import { GraduationType } from '@/types/form/client';
import { color } from '@maru/design-system';
import { Row, Switch, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import { styled } from 'styled-components';
import GEDCalculator from './GEDCalculator/GEDCalculator';
import BasicCalculator from './BasicCalculator/BasicCalculator';

interface GradeCalculatorProps {
  subjectError?: boolean[];
  newSubjectError?: boolean[];
  option: 'SIMULATION' | 'FORM';
}

const GradeCalculator = ({
  subjectError,
  newSubjectError,
  option,
}: GradeCalculatorProps) => {
  const [form, setForm] = useFormStore();

  const handleChangeGraduationType = (value: string) => {
    const graduationType = value as GraduationType;
    setForm((prev) => ({
      ...prev,
      education: { ...prev.education, graduationType },
    }));
  };

  return (
    <StyledGradeCalculator>
      <Row alignItems="top" justifyContent="space-between">
        <Text fontType="p3" color={color.red}>
          {option === 'SIMULATION' && (
            <>
              *교과성적이 없는 학기나 학년의 경우 모집요강을 반드시 확인해주시기 바랍니다.
              <br />
            </>
          )}
          *과목명이 없는 경우 ‘과목추가’를 선택하여 성취 수준을 입력해주시길 바랍니다.
          <br />
          *국어•영어•수학에서 미이수 입력 시 자동으로 C로 처리됩니다.
          <br />
          {option === 'SIMULATION' && <>*-(하이픈)은 점수에 반영되지 않습니다.</>}
        </Text>
        {option === 'SIMULATION' && (
          <Switch
            items={[
              { name: '졸업 예정', value: 'EXPECTED' },
              { name: '졸업', value: 'GRADUATED' },
              { name: '검정고시', value: 'QUALIFICATION_EXAMINATION' },
            ]}
            value={form.education.graduationType}
            onChange={handleChangeGraduationType}
          />
        )}
      </Row>
      <SwitchCase
        value={form.education.graduationType}
        caseBy={{
          QUALIFICATION_EXAMINATION: <GEDCalculator />,

        }}
        defaultComponent={
          <BasicCalculator
            subjectError={subjectError}
            newSubjectError={newSubjectError}
          />
        }
      />
    </StyledGradeCalculator>
  );
};

export default GradeCalculator;

const StyledGradeCalculator = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  gap: 24px;
`;
