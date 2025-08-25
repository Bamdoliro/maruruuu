'use client';

import { FinalResultBox, ResultMainBox } from '@/components/result';
import { SCHEDULE } from '@/constants/form/constants';
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

const ResultFinal = () => {
  usePageAccessGuard({
    period: { start: SCHEDULE.최종_합격_발표, end: SCHEDULE.입학_등록 },
    title: '최종 합격 발표 기간이 아닙니다',
    content:
      '최종 합격 발표 기간에만 확인이 가능합니다.\n최종 합격 발표 기간까지 조금만 기다려 주세요.',
  });

  const [finalResultStep, setFinalResultStep] = useState<ResultStep>('MAIN');

  return (
    <AppLayout header footer>
      <StyledResultFinal>
        <Column alignItems="center" gap={12}>
          <Text fontType="H6" color={color.gray900}>
            {formatYear(SCHEDULE.원서_접수, true)}학년도 부산소프트웨어마이스터고등학교
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
                date={formatResultDateTime(SCHEDULE.최종_합격_발표)}
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
