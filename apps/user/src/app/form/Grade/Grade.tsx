import { GradePreview } from '@/components/form';
import { FormLayout } from '@/layouts';
import { useFormGradeStepValueStore } from '@/stores';
import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import styled from 'styled-components';
import Score from './Score/Score';
import Attendance from './Attendance/Attendance';
import Volunteer from './Volunteer/Volunteer';
import Certificate from './Certificate/Certificate';

const Grade = () => {
  const formStep = useFormGradeStepValueStore();

  return (
    <FormLayout title="성적 입력">
      <StyledGrade>
        <Text fontType="p3" color={color.red}>
          *교과성적이 없는 학기나 학년의 경우 모집요강을 반드시 확인 바랍니다.
          <br />
          *성취수준이 없고 원점수로 되어있는 학기나 학년은 아래표를 참고 바랍니다.
        </Text>
        <Column gap={64}>
          <Column gap={12}>
            <Text fontType="H4" color={color.gray900}>
              성적 계산
            </Text>
            <GradePreview location={formStep} />
          </Column>
          <SwitchCase
            value={formStep}
            caseBy={{
              교과성적: <Score />,
              출결상황: <Attendance />,
              봉사시간: <Volunteer />,
              자격증: <Certificate />,
            }}
            defaultComponent={<Score />}
          />
        </Column>
      </StyledGrade>
    </FormLayout>
  );
};

export default Grade;

const StyledGrade = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 24px;
`;
