'use client';

import { FirstResultBox, ResultMainBox } from '@/components/result';
import { usePageAccessGuard } from '@/hooks';
import { AppLayout } from '@/layouts';
import type { ResultStep } from '@/types/result/client';
import { formatYear, formatResultDateTime } from '@/utils';
import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import { styled } from 'styled-components';
import { SCHEDULE } from '@/constants/common/constants';

const ResultFirst = () => {
  usePageAccessGuard({
    period: { start: SCHEDULE.일차_합격_발표, end: SCHEDULE.이차_면접 },
    title: '1차 합격 발표 기간이 아닙니다',
    content:
      '1차 합격 발표 기간에만 확인이 가능합니다.\n1차 합격 발표 기간까지 조금만 기다려 주세요.',
  });

  const [firstResultStep, setFirstResultStep] = useState<ResultStep>('MAIN');

  return (
    <AppLayout header footer>
      <StyledResultFirst>
        <Column alignItems="center" gap={12}>
          <Text fontType="H6" color={color.gray900}>
            {formatYear(SCHEDULE.원서_접수, true)}학년도 부산소프트웨어마이스터고등학교
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
                date={formatResultDateTime(SCHEDULE.일차_합격_발표)}
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
