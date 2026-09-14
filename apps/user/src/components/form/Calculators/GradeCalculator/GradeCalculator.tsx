import { formAtom } from '@/stores';
import { useAtomValue } from 'jotai';
import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import styled from '@emotion/styled';
import GEDCalculator from './GEDCalculator/GEDCalculator';
import BasicCalculator from './BasicCalculator/BasicCalculator';

interface GradeCalculatorProps {
  subjectError?: boolean[];
  option: 'SIMULATION' | 'FORM';
}

const GradeCalculator = ({ subjectError, option }: GradeCalculatorProps) => {
  const form = useAtomValue(formAtom);

  return (
    <StyledGradeCalculator>
      <Text fontType="p3" color={color.red}>
        {option === 'SIMULATION' && (
          <>
            *교과성적이 없는 학기나 학년의 경우 모집요강을 반드시 확인해주시기 바랍니다.
            <br />
          </>
        )}
        *국어•영어•수학에서 미이수 입력 시 자동으로 C로 처리됩니다.
      </Text>
      <SwitchCase
        value={form.education.graduationType}
        caseBy={{
          QUALIFICATION_EXAMINATION: <GEDCalculator />,
        }}
        defaultComponent={<BasicCalculator subjectError={subjectError} />}
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
