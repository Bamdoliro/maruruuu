import { FORM_DETAIL_STEP_LIST } from '@/constants/form/constant';
import { color } from '@maru/design-system';
import { Column, Row, UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import { useState } from 'react';
import { styled } from 'styled-components';

interface FormDetailProps {
  id: number;
}

const FormDetail = ({ id }: FormDetailProps) => {
  const [currentFormDetailStep, setCurrentFormDetailStep] = useState('지원자 정보');
  return (
    <StyledFormDetailContent>
      <Column gap={36}>
        {`프로필`}
        {`원서상태`}
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
      </Column>
    </StyledFormDetailContent>
  );
};

export default FormDetail;

const StyledFormDetailContent = styled.div`
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
