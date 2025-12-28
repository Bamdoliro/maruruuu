'use client';

import { GlobalStyle } from '@maru/design-system';
import { OverlayProvider } from '@toss/use-overlay';
import type { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import { Toast } from '@maru/ui';
import styled from 'styled-components';
import useToast from '@maru/hooks/src/useToast';
import type { ToastProgress } from '@maru/hooks/src/useToast';

interface Props {
  children: ReactNode;
}

const GlobalToast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <StyledToastContainer>
      {toasts.map((toast: ToastProgress) => (
        <StyledToastWrapper key={toast.id}>
          <Toast
            type={toast.toastType}
            device={toast.device}
            progress={toast.progress}
            onClose={() => removeToast(toast.id)}
          >
            {toast.message}
          </Toast>
        </StyledToastWrapper>
      ))}
    </StyledToastContainer>
  );
};

const StyledToastContainer = styled.div`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    align-items: center;
  }

  @media (min-width: 769px) {
    top: 150px;
    right: 48px;
    align-items: flex-end;
  }
`;

const StyledToastWrapper = styled.div`
  animation: slideIn 0.3s ease forwards;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Provider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <OverlayProvider>
        <GlobalStyle />
        {children}
        <GlobalToast />
      </OverlayProvider>
    </RecoilRoot>
  );
};

export default Provider;
