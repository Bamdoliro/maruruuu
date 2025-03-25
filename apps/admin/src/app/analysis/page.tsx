'use client';

import AppLayout from '@/layouts/AppLayout';
import ApplicantCount from '@/components/analysis/ApplicantCount/ApplicantCount';
import styled from 'styled-components';
import { flex } from '@maru/utils';
import { Column, Row } from '@maru/ui';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import { ANALYSIS_TYPE } from '@/constants/analysis/constant';
import { useState } from 'react';
import { SwitchCase } from '@toss/react';
import ApplicationTypeRatio from '@/components/analysis/ApplicationTypeRatio/ApplicationTypeRatio';
import GenderRatio from '@/components/analysis/GenderRatio/GenderRatio';
import GraduatedSchool from '@/components/analysis/GraduatedSchool/GraduatedSchool';
import GradeDistribution from '@/components/analysis/GradeDistribution/GradeDistribution';

const AnalysisPage = () => {
  const [currentAnalysisType, setcurrentAnalysisType] = useState('지원자 수 (경쟁률)');

  return (
    <AppLayout>
      <StyledAnalysisPage>
        <Row gap={60}>
          <Column gap={10}>
            {ANALYSIS_TYPE.map((type, index) => (
              <SideMenu
                key={`anaysis-type ${index}`}
                isActive={currentAnalysisType === type}
                onClick={() => setcurrentAnalysisType(type)}
              >
                {type}
              </SideMenu>
            ))}
          </Column>
          <SwitchCase
            value={currentAnalysisType}
            caseBy={{
              '지원자 수 (경쟁률)': <ApplicantCount />,
              '성적 분포': <GradeDistribution />,
              '지원 전형 비율': <ApplicationTypeRatio />,
              '지원자 성비': <GenderRatio />,
              '출신 학교 현황': <GraduatedSchool />,
            }}
          />
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
  padding: 3.25rem 3.25rem;
`;
