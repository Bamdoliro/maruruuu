import { styled } from 'styled-components';
import CheckFormComplete from './CheckFormComplete/CheckFormComplete';
import { useFormValueStore } from '@/stores';
import { useCTAButton } from './CheckFormCompleteBox.hook';

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
  const { handleCorrectGrade, handleCorrectForm } = useCTAButton();

  return (
    <StyledCheckFormCompleteBox>
      <CheckFormComplete
        formStep="지원자 정보"
        maxCompleteOfNumber={5}
        completeOfNumber={applicantFilledCount}
        onClick={() => handleCorrectForm('지원자정보')}
      />
      <CheckFormComplete
        formStep="보호자 정보"
        maxCompleteOfNumber={6}
        completeOfNumber={parentFilledCount}
        onClick={() => handleCorrectForm('보호자정보')}
      />
      <CheckFormComplete
        formStep="출신학교 및 학력"
        maxCompleteOfNumber={
          form.education.graduationType === 'QUALIFICATION_EXAMINATION' ? +'2' : 9
        }
        completeOfNumber={educationFilledCount}
        onClick={() => handleCorrectForm('출신학교및학력')}
      />
      <CheckFormComplete
        formStep="전형 선택"
        maxCompleteOfNumber={1}
        completeOfNumber={typeFilledCount}
        onClick={() => handleCorrectForm('전형선택')}
      />
      <CheckFormComplete
        formStep="성적 입력"
        maxCompleteOfNumber={4}
        completeOfNumber={4}
        onClick={handleCorrectGrade}
      />
      <CheckFormComplete
        formStep="자기소개서 및 학업계획서"
        maxCompleteOfNumber={2}
        completeOfNumber={documentFilledCount}
        onClick={() => handleCorrectForm('자기소개서')}
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
