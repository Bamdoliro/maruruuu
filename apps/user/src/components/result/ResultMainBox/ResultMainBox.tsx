import type { ResultStep } from '@/types/result/client';
import { color } from '@maru/design-system';
import { Button, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import type { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface ResultMainProps {
  setResultStep: Dispatch<SetStateAction<ResultStep>>;
  date: string;
  capacity: string;
}

const ResultMain = ({ setResultStep, date, capacity }: ResultMainProps) => {
  const handleClickMoveResultPage = () => {
    setResultStep('RESULT');
  };

  return (
    <StyledResultMain>
      <InfoBox>
        <Text fontType="p2" color={color.gray700}>
          일시: {date}
        </Text>
        <Text fontType="p2" color={color.gray700}>
          모집 정원: {capacity}
        </Text>
        <Text fontType="p2" color={color.gray700}>
          장소: 본교 입학전형 서비스 (마루)
        </Text>
      </InfoBox>
      <Button onClick={handleClickMoveResultPage} size="LARGE">
        결과 확인하기
      </Button>
    </StyledResultMain>
  );
};

export default ResultMain;

const StyledResultMain = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  gap: 48px;
`;

const InfoBox = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 600px;
  height: 150px;
  background-color: ${color.gray50};
  padding: 24px 36px;
  border-radius: 12px;
  gap: 12px;
`;
