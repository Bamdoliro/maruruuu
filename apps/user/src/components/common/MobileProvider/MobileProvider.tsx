'use client';

import { Storage } from '@/apis/storage/storage';
import { MobileLogin, MobileMain, MobileResult } from '@/components/mobile';
import { TOKEN } from '@/constants/common/constants';
import { useStepStore } from '@/stores';
import { SwitchCase } from '@toss/react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MobileProvider = ({ children }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [step, setStep] = useStepStore();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 700);
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const accessToken = Storage.getItem(TOKEN.ACCESS);
    if (accessToken) {
      if (step === 'LOGIN') setStep('MAIN');
    } else {
      if (step !== 'LOGIN') setStep('LOGIN');
    }
  }, []);

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
