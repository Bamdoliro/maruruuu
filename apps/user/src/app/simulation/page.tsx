'use client';

import {
  AttendanceCalculator,
  CertificateCalculator,
  GradeCalculator,
  GradePreview,
  VolunteerCalculator,
} from '@/components/form';
import { STEP_LIST } from '@/constants/form/data';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { Column, Text, UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useNavigationClick } from './simulation.hook';
import { SwitchCase } from '@toss/react';

const Simulation = () => {
  const { handleMoveStep, currentStep } = useNavigationClick();

  return (
    <AppLayout header footer>
      <StyledSimulation>
        <Column gap={16}>
          <Text fontType="H1" color={color.gray900}>
            성적 모의 계산
          </Text>
          <Text fontType="p2" color={color.gray600}>
            성적을 입력하면 교과 성적 산출식으로 계산된 결과를 실시간으로 볼 수 있습니다.
          </Text>
        </Column>
        <Column gap={24}>
          <Text fontType="p3" color={color.red}>
            *교과 성적 산출 방식에 대한 자세한 정보는 모집요강에서 확인해주시기 바랍니다.
            <br />
            *특례입학 대상자는 일반 전형 교과 성적 산출식이 적용됩니다.
            <br />
            *입학전형 요강을 참고하여 신중하게 입력하여 주시기 바랍니다.
          </Text>
          <GradePreview />
        </Column>
        <Column gap={24}>
          <Navigation>
            {STEP_LIST.map((step, index) => (
              <UnderlineButton
                key={`step ${index}`}
                active={step === currentStep}
                onClick={() => handleMoveStep(step)}
              >
                {step}
              </UnderlineButton>
            ))}
          </Navigation>
          <SwitchCase
            value={currentStep}
            caseBy={{
              성적입력: <GradeCalculator option="SIMULATION" />,
              출결상황: <AttendanceCalculator />,
              봉사시간: <VolunteerCalculator />,
              자격증: <CertificateCalculator />,
            }}
            defaultComponent={<GradeCalculator option="SIMULATION" />}
          />
        </Column>
      </StyledSimulation>
    </AppLayout>
  );
};

export default Simulation;

const StyledSimulation = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  padding: 82px 312px 180px;
  margin: 0 auto;
  gap: 48px;
`;

const Navigation = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 54px;
  background-color: ${color.white};
`;
