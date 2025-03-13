'use client';

import AppLayout from '@/layouts/AppLayout';
import ApplicantCount from '@/components/analysis/ApplicantCount/ApplicantCount';
import styled from 'styled-components';
import { flex } from '@maru/utils';
import { Column, Row, Text } from '@maru/ui';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import { ANALYSIS_TYPE } from '@/constants/analysis/data';
import { useState } from 'react';
const AnalysisPage = () => {
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('지원자 수 (경쟁률)');

  return (
    <AppLayout>
      <StyledAnalysisPage>
        <Text fontType="H2">분석</Text>
        <Row gap={60}>
          <Column gap={10}>
            {ANALYSIS_TYPE.map((type, index) => (
              <SideMenu
                key={`anaysis-type ${index}`}
                isActive={selectedAnalysisType === type}
                onClick={() => setSelectedAnalysisType(type)}
              >
                {type}
              </SideMenu>
            ))}
          </Column>
          <ApplicantCount />
        </Row>
      </StyledAnalysisPage>
    </AppLayout>
  );
};

export default AnalysisPage;

const StyledAnalysisPage = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column' })}
  gap: 40px;
  width: 100%;
  min-height: 100vh;
  padding: 3.5rem 3.25rem;
`;
