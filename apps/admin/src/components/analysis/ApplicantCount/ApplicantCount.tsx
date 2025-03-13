import styled from 'styled-components';
import { Column, Text, Row, UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import DetailTable from './DetailTable/DetailTable';
import Competition from './DetailTable/Competition';
import { ANALYSIS_STEP } from '@/constants/analysis/data';
import { useState } from 'react';

const ApplicantCount = () => {
  const [currentStep, setCurrentStep] = useState('변경 전');

  return (
    <StyledApplicantCount>
      <NavigatorBar>
        {ANALYSIS_STEP.map((step, index) => (
          <UnderlineButton
            key={`form-step-tab ${index}`}
            active={step === currentStep}
            onClick={() => setCurrentStep(step)}
          >
            {step}
          </UnderlineButton>
        ))}
      </NavigatorBar>
      <Row gap={40}>
        <ApplicantInfoWrapper>
          <TextContainer>
            <Column gap={40}>
              <Column>
                <Text fontType="btn2">전체 지원자 수</Text>
                <Text fontType="D2">{121}명</Text>
              </Column>
              <Column>
                <Text fontType="btn2">전체 경쟁률</Text>
                <Text fontType="D2">1.89 : 1</Text>
              </Column>
            </Column>
          </TextContainer>
          <Column justifyContent="space-between">
            <Competition />
          </Column>
        </ApplicantInfoWrapper>
        <DetailTable />
      </Row>
    </StyledApplicantCount>
  );
};

export default ApplicantCount;

const StyledApplicantCount = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
`;

const TextContainer = styled.div``;

const ApplicantInfoWrapper = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  height: 100%;
`;

const NavigatorBar = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 60px;
`;
