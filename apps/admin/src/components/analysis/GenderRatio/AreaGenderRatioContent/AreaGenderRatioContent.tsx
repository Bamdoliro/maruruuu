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
            '일반 전형 성비': <AreaGenderRatioTable title="일반 전형 지역별 성비" />,
            '특별 전형 성비': (
              <>
                <AreaGenderRatioTable title="마이스터 인재 전형 지역별 성비" />
                <AreaGenderRatioTable title="사회통합 - 정원내 지역별 성비" />
              </>
            ),
            '정원 외 전형': (
              <>
                <AreaGenderRatioTable title="특례입학" />
                <AreaGenderRatioTable title="국가보훈대상자 중 교육지원대상자" />
              </>
            ),
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
