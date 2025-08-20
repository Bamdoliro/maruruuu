import { FORM_DETAIL_FIELDS } from '@/constants/form/constant';
import { color } from '@maru/design-system';
import { Column, UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import { useState } from 'react';
import { styled } from 'styled-components';
import Profile from './Profile/Profile';
import { SwitchCase } from '@toss/react';
import ApplicantInfo from './ApplicantInfo/ApplicantInfo';
import ParentInfo from './ParentInfo/ParentInfo';
import EducationInfo from './EducationInfo/EducationInfo';
import TypeInfo from './TypeInfo/TypeInfo';
import type { FormDetailField } from '@/types/form/client';
import GradesInfo from './GradesInfo/GradesInfo';
import DocumentInfo from './DocumentInfo/DocumentInfo';

interface FormDetailProps {
  id: number;
}

const FormDetail = ({ id }: FormDetailProps) => {
  const [currentFormDetailField, setCurrentFormDetailField] =
    useState<FormDetailField>('지원자 정보');

  return (
    <StyledFormDetail>
      <Column gap={36}>
        <Profile id={id} />
        {/**원서상태 백엔드 수정되면 개발**/}
      </Column>
      <Column width="100%">
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
            '지원자 정보': <ApplicantInfo id={id} />,
            '보호자 정보': <ParentInfo id={id} />,
            '출신학교 및 학력': <EducationInfo id={id} />,
            전형: <TypeInfo id={id} />,
            성적: <GradesInfo id={id} />,
            자기소개서: <DocumentInfo id={id} />,
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
  padding-bottom: 1px;
  background-color: ${color.white};
  border-bottom: 2px solid ${color.gray200};
`;
