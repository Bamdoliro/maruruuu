import { FORM_DETAIL_FIELDS } from '@/constants/form/constant';
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
import TypeInfo from './TypeInfo/TypeInfo';
import type { FormDetailField } from '@/types/form/client';
import GradesInfo from './GradesInfo/GradesInfo';

interface FormDetailProps {
  id: number;
}

const FormDetail = ({ id }: FormDetailProps) => {
  const [currentFormDetailField, setCurrentFormDetailField] =
    useState<FormDetailField>('지원자 정보');

  const { profileData, applicantData, parentData, educationData, typeData, gradesData } =
    useFormDetailDataDecomposition(id);

  return (
    <StyledFormDetail>
      <Column gap={36}>
        <Profile profileData={profileData} />
        {/**원서상태 백엔드 수정되면 개발**/}
      </Column>
      <Column>
        <NavigationBar>
          {FORM_DETAIL_FIELDS.map((formDetailField) => (
            <UnderlineButton
              key={formDetailField}
              active={currentFormDetailField === formDetailField}
              onClick={() => setCurrentFormDetailField(formDetailField)}
            >
              {formDetailField}
            </UnderlineButton>
          ))}
        </NavigationBar>
        <SwitchCase
          value={currentFormDetailField}
          caseBy={{
            '지원자 정보': <ApplicantInfo applicantData={applicantData} />,
            '보호자 정보': <ParentInfo parentData={parentData} />,
            '출신학교 및 학력': <EducationInfo educationData={educationData} />,
            전형: <TypeInfo typeData={typeData} />,
            성적: <GradesInfo gradesData={gradesData} />,
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
  border-bottom: 2px solid ${color.gray200};
`;
