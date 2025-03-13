import { FormStep } from '@/types/form/client';
import { Button } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

interface FormControllerProps {
  onPrevious?: () => void;
  onNext: () => void;
  step: FormStep;
}

const FormController = ({ onPrevious, onNext, step }: FormControllerProps) => {
  return (
    <StyledControllerArea>
      {step === '지원자정보' ? (
        <Button styleType="PRIMARY" size="MEDIUM" width={150} onClick={onNext}>
          다음
        </Button>
      ) : (
        <StyledFormController>
          <Button styleType="SECONDARY" size="MEDIUM" width={150} onClick={onPrevious}>
            이전
          </Button>
          <Button styleType="PRIMARY" size="MEDIUM" width={150} onClick={onNext}>
            {step === '자기소개서' ? <p>작성 완료</p> : <p>다음</p>}
          </Button>
        </StyledFormController>
      )}
    </StyledControllerArea>
  );
};

export default FormController;

const StyledControllerArea = styled.div`
  ${flex({ justifyContent: 'flex-end' })}
  width: 100%;
  margin-top: 60px;
`;

const StyledFormController = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'flex-end' })}
  width: 100%;
  gap: 24px;
`;
