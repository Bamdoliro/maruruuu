import { useCorrectValueStore, useFormGradeStepValueStore } from '@/stores';
import type { FormStep } from '@/types/form/client';
import { Button } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

interface FormControllerProps {
  onPrevious?: () => void;
  onNext: () => void;
  step: FormStep;
}

const FormController = ({ onPrevious, onNext, step }: FormControllerProps) => {
  const correct = useCorrectValueStore();
  const formGradeStep = useFormGradeStepValueStore();

  return (
    <StyledControllerArea>
      {step === '지원자정보' ||
      (correct === true &&
        (formGradeStep === '교과성적' ||
          step === '보호자정보' ||
          step === '자기소개서' ||
          step === '전형선택' ||
          step === '출신학교및학력')) ? (
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
