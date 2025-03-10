import { styled } from 'styled-components';
import CheckFormComplete from './CheckFormComplete/CheckFormComplete';
import { useFormValueStore } from '@/stores';

interface Props {
  applicantFilledCount: number;
  parentFilledCount: number;
  educationFilledCount: number;
  typeFilledCount: number;
  documentFilledCount: number;
}

const CheckFormCompleteBox = ({
  applicantFilledCount,
  parentFilledCount,
  educationFilledCount,
  typeFilledCount,
  documentFilledCount,
}: Props) => {
  const form = useFormValueStore();

  return (
    <StyledCheckFormCompleteBox>
      <CheckFormComplete
        formStep="지원자 정보"
        maxCompleteOfNumber={5}
        completeOfNumber={applicantFilledCount}
      />
      <CheckFormComplete
        formStep="보호자 정보"
        maxCompleteOfNumber={6}
        completeOfNumber={parentFilledCount}
      />
      <CheckFormComplete
        formStep="출신학교 및 학력"
        maxCompleteOfNumber={
          form.education.graduationType === 'QUALIFICATION_EXAMINATION' ? +'2' : 9
        }
        completeOfNumber={educationFilledCount}
      />
      <CheckFormComplete
        formStep="전형 선택"
        maxCompleteOfNumber={1}
        completeOfNumber={typeFilledCount}
      />
      <CheckFormComplete
        formStep="성적 입력"
        maxCompleteOfNumber={4}
        completeOfNumber={4}
      />
      <CheckFormComplete
        formStep="자기소개서 및 학업계획서"
        maxCompleteOfNumber={2}
        completeOfNumber={documentFilledCount}
      />
    </StyledCheckFormCompleteBox>
  );
};

export default CheckFormCompleteBox;

const StyledCheckFormCompleteBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  height: 248px;
`;
