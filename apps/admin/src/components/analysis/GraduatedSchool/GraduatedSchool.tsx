import { ANALYSIS_PASS_STEP } from '@/constants/analysis/data';
import { SubDropdown, UnderlineButton } from '@maru/ui';
import { SwitchCase } from '@toss/react';
import GraduatedAreaTable from './GraduatedAreaTable/GraduatedAreaTable';
import { useState } from 'react';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { AreaCategory } from '@/types/analysis/client';
import GradeDistribution from '../GradeDistribution/GradeDistribution';

const GraduatedSchool = () => {
  const [currentAnalysisPassStep, setCurrentAnalysisPassStep] = useState('전체 조회');
  const [areaCategory, setAreaCategory] = useState<AreaCategory>('');

  const handleAreaCategoryChange = (selectedValue: string) => {
    setAreaCategory(selectedValue as AreaCategory);
  };

  return (
    <StyledGenderRatio>
      <NavigatorBar>
        {ANALYSIS_PASS_STEP.map((step, index) => (
          <UnderlineButton
            key={`form-pass-step-tab ${index}`}
            active={step === currentAnalysisPassStep}
            onClick={() => setCurrentAnalysisPassStep(step)}
          >
            {step}
          </UnderlineButton>
        ))}
      </NavigatorBar>
      <SubDropdown
        data={[
          {
            value: 'BUSAN',
            label: '부산 지역',
            children: [
              { value: '중구', label: '중구' },
              { value: '해운대구', label: '해운대구' },
              { value: '서구', label: '서구' },
              { value: '사하구', label: '사하구' },
              { value: '동구', label: '동구' },
              { value: '금정구', label: '금정구' },
              { value: '영도구', label: '영도구' },
              { value: '강서구', label: '강서구' },
              { value: '부산진구', label: '부산진구' },
              { value: '연제구', label: '연제구' },
              { value: '동래구', label: '동래구' },
              { value: '수영구', label: '수영구' },
              { value: '남구', label: '남구' },
              { value: '사상구', label: '사상구' },
              { value: '북구', label: '북구' },
              { value: '기장군', label: '기장군' },
              { value: '', label: '부산 전체' },
            ],
          },
          {
            value: 'OTHER_AREA',
            label: '타 지역',
          },
        ]}
        size="SMALL"
        width={200}
        placeholder="지역 선택"
        onChange={handleAreaCategoryChange}
        name="category"
      ></SubDropdown>
      <SwitchCase
        value={currentAnalysisPassStep}
        caseBy={{
          '전체 조회': <GraduatedAreaTable />,
          '1차 합격자': <GraduatedAreaTable />,
          '2차 전형자': <GraduatedAreaTable />,
          '최종 합격자': <GraduatedAreaTable />,
        }}
      />
    </StyledGenderRatio>
  );
};

export default GraduatedSchool;

const StyledGenderRatio = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 36px;
`;

const NavigatorBar = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 60px;
`;
