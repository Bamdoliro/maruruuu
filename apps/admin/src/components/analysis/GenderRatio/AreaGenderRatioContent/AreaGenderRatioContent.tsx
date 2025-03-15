import { ANALYSIS_RATIO_TYPE } from '@/constants/analysis/data';
import { Column, Text, UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import styled from 'styled-components';
import AreaGenderRatioTable from './AreaGenderRatioTable';

const AreaGenderRatioContent = () => {
  const [currentAnalysisRatioType, setCurrentAnalysisRatioType] =
    useState('일반 전형 성비');

  return (
    <StyledAreaGenderRatioContent>
      <Text fontType="H4">지역별 성비</Text>
      <Column gap={40}>
        <NavigatorBar>
          {ANALYSIS_RATIO_TYPE.map((type, index) => (
            <UnderlineButton
              key={`form-pass-step-tab ${index}`}
              active={type === currentAnalysisRatioType}
              onClick={() => setCurrentAnalysisRatioType(type)}
            >
              {type}
            </UnderlineButton>
          ))}
        </NavigatorBar>
        <SwitchCase
          value={currentAnalysisRatioType}
          caseBy={{
            '일반 전형 성비': <AreaGenderRatioTable />,
            '특별 전형 성비': <AreaGenderRatioTable />,
            '정원 외 전형': <AreaGenderRatioTable />,
          }}
        />
      </Column>
    </StyledAreaGenderRatioContent>
  );
};

export default AreaGenderRatioContent;

const StyledAreaGenderRatioContent = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 8px;
`;

const NavigatorBar = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 60px;
`;
