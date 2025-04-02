'use client';

import { FirstResultBox, ResultMainBox } from '@/components/result';
import { AppLayout } from '@/layouts';
import type { ResultStep } from '@/types/result/client';
import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import { styled } from 'styled-components';

const ResultFirst = () => {
  const [firstResultStep, setFirstResultStep] = useState<ResultStep>('MAIN');

  return (
    <AppLayout header footer>
      <StyledResultFirst>
        <Column alignItems="center" gap={12}>
          <Text fontType="H6" color={color.gray900}>
            2024학년도 부산소프트웨어마이스터고등학교
          </Text>
          <Text fontType="D3" color={color.gray900}>
            1차 합격자 발표
          </Text>
        </Column>
        <SwitchCase
          value={firstResultStep}
          caseBy={{
            MAIN: (
              <ResultMainBox
                date="2024년 10월 23일 (월) 15:00"
                capacity="일반전형 및 특별전형 각각 모집정원의 130% 이내"
                setResultStep={setFirstResultStep}
              />
            ),
            RESULT: <FirstResultBox />,
          }}
        />
      </StyledResultFirst>
    </AppLayout>
  );
};

export default ResultFirst;

const StyledResultFirst = styled.div`
  ${flex({ alignItems: 'center', flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  padding-top: 82px;
  gap: 48px;
`;
