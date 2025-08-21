'use client';

import { FinalResultBox, ResultMainBox } from '@/components/result';
import { SCHEDULE } from '@/constants/form/constants';
import { AppLayout } from '@/layouts';
import type { ResultStep } from '@/types/result/client';
import { formatFormYear } from '@/utils';
import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import { styled } from 'styled-components';

const ResultFinal = () => {
  const [finalResultStep, setFinalResultStep] = useState<ResultStep>('MAIN');

  return (
    <AppLayout header footer>
      <StyledResultFinal>
        <Column alignItems="center" gap={12}>
          <Text fontType="H6" color={color.gray900}>
            {formatFormYear(SCHEDULE.원서_접수)}학년도 부산소프트웨어마이스터고등학교
          </Text>
          <Text fontType="D3" color={color.gray900}>
            최종 합격자 발표
          </Text>
        </Column>
        <SwitchCase
          value={finalResultStep}
          caseBy={{
            MAIN: (
              <ResultMainBox
                date="2024년 10월 23일 (월) 15:00"
                capacity="일반전형 36명, 특별전형 28명, 정원 외 전형 3명"
                setResultStep={setFinalResultStep}
              />
            ),
            RESULT: <FinalResultBox />,
          }}
        />
      </StyledResultFinal>
    </AppLayout>
  );
};

export default ResultFinal;

const StyledResultFinal = styled.div`
  ${flex({ alignItems: 'center', flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  padding-top: 82px;
  gap: 48px;
`;
