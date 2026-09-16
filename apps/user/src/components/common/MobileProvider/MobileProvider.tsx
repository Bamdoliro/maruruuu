'use client';

import { MobileLogin, MobileMain, MobileResult } from '@/components/mobile';
import { stepAtom } from '@/stores';
import { useAtom } from 'jotai';
import { useAuthState } from '@maru/hooks';
import { isMobileDevice } from '@/utils';
import { SwitchCase } from '@toss/react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MobileProvider = ({ children }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [step, setStep] = useAtom(stepAtom);
  const { isLoggedIn } = useAuthState();

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (step === 'LOGIN') setStep('MAIN');
    } else {
      if (step !== 'LOGIN') setStep('LOGIN');
    }
  }, [isLoggedIn, setStep, step]);

  if (isMobile === null) return null;

  if (isMobile) {
    return (
      <>
        <SwitchCase
          value={step}
          caseBy={{
            LOGIN: <MobileLogin />,
            MAIN: <MobileMain />,
            RESULT: <MobileResult />,
          }}
        />
      </>
    );
  }

  return children;
};

export default MobileProvider;
