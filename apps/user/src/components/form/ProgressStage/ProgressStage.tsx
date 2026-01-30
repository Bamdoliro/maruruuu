import { useFormStepValueStore } from '@/stores';
import { color, font } from '@maru/design-system';
import { IconCheck } from '@maru/icon';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';

const PROGRESS_BAR_DISPLAY_DATA = [
  '지원자 정보',
  '보호자 정보',
  '출신학교 및 학력',
  '전형 선택',
  '성적 입력',
  '자기소개서',
] as const;

const PROGRESS_BAR_DATA = [
  '지원자정보',
  '보호자정보',
  '출신학교및학력',
  '전형선택',
  '성적입력',
  '자기소개서',
] as const;

const ProgressSteps = () => {
  const formStep = useFormStepValueStore();
  const currentStepIndex = PROGRESS_BAR_DATA.findIndex((step) => step === formStep);

  return (
    <StyledProgressSteps>
      {PROGRESS_BAR_DISPLAY_DATA.map((item, index) => (
        <Circle
          key={`progress ${index}`}
          name={item}
          $active={index < currentStepIndex}
          $isCurrent={index === currentStepIndex}
        >
          {index < currentStepIndex ? <IconCheck width={24} height={24} /> : index + 1}
        </Circle>
      ))}
    </StyledProgressSteps>
  );
};

export default ProgressSteps;

const StyledProgressSteps = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 52px 200px 4px;
  margin-bottom: 61px;

  &::before {
    width: calc(100% - 400px);
    height: 2px;
    position: absolute;
    content: '';
    background-color: ${color.gray300};
  }
`;

const Circle = styled.div<{ $active: boolean; $isCurrent: boolean; name: string }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 44px;
  height: 44px;
  z-index: 1;
  ${font.p1}
  color: ${(props) =>
    props.$active ? color.white : props.$isCurrent ? color.maruDefault : color.gray600};
  background-color: ${(props) =>
    props.$active ? color.maruDefault : props.$isCurrent ? color.white : color.gray50};
  border-radius: 50%;
  border: 2px solid
    ${(props) => (props.$active || props.$isCurrent ? color.maruDefault : color.gray300)};

  &::after {
    ${font.context}
    color: ${(props) => (props.$isCurrent ? color.maruDefault : color.gray600)};
    content: '${(props) => props.name}';
    position: absolute;
    top: calc(100% + 4px);
  }
`;
