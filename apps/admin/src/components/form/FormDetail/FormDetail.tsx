import { FORM_DETAIL_STEP_LIST } from '@/constants/form/constant';
import { color } from '@maru/design-system';
import { Column, UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import { useState } from 'react';
import { styled } from 'styled-components';
import { useFormDetailDataDecomposition } from './formDetail.hooks';
import Profile from './Profile/Profile';
import { SwitchCase } from '@toss/react';
import ApplicantInfo from './ApplicantInfo/ApplicantInfo';
import ParentInfo from './ParentInfo/ParentInfo';
import EducationInfo from './EducationInfo/EducationInfo';

interface FormDetailProps {
  id: number;
}

const FormDetail = ({ id }: FormDetailProps) => {
  const [currentFormDetailStep, setCurrentFormDetailStep] = useState('지원자 정보');

  const { profileData, applicantData, parentData, educationData } =
    useFormDetailDataDecomposition(id);

  return (
    <StyledFormDetail>
      <Column gap={36}>
        <Profile profileData={profileData} />
        {/**원서상태 백엔드 수정되면 개발**/}
      </Column>
      <Column gap={48}>
        <NavigationBar>
          {FORM_DETAIL_STEP_LIST.map((formDetailStep, index) => (
            <UnderlineButton
              key={`form-detail-step ${index}`}
              active={formDetailStep === currentFormDetailStep}
              onClick={() => setCurrentFormDetailStep(formDetailStep)}
            >
              {formDetailStep}
            </UnderlineButton>
          ))}
        </NavigationBar>
        <SwitchCase
          value={currentFormDetailStep}
          caseBy={{
            '지원자 정보': <ApplicantInfo applicantData={applicantData} />,
            '보호자 정보': <ParentInfo parentData={parentData} />,
            '출신학교 및 학력': <EducationInfo educationData={educationData} />,
          }}
        />
      </Column>
    </StyledFormDetail>
  );
};

export default FormDetail;

const StyledFormDetail = styled.div`
  display: flex;
  gap: 48px;
  width: 100%;
`;

const NavigationBar = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 60px;
  background-color: ${color.white};
`;
