import { flex } from '@maru/utils';
import type { ReactNode } from 'react';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';
import Text from '../Text/Text';
import { color } from '@maru/design-system';
import { IconCancelCircle, IconCheckCircle } from '@maru/icon';

interface ToastProps {
  children: ReactNode;
  width?: CSSProperties['width'];
  type: 'ERROR' | 'SUCCESS';
  device?: 'MOBILE' | 'COMPUTER';
}

const Toast = ({ children, width, type, device = 'COMPUTER' }: ToastProps) => {
  return (
    <StyledToast style={{ width }} device={device}>
      {type === 'ERROR' ? (
        <IconCancelCircle width={32} height={32} />
      ) : (
        <IconCheckCircle width={32} height={32} />
      )}
      <Text fontType="p2" color={color.gray900}>
        {children}
      </Text>
    </StyledToast>
  );
};

export default Toast;

const StyledToast = styled.div<{ device: 'MOBILE' | 'COMPUTER' }>`
  ${flex({
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  })}
  position: fixed;
  gap: 8px;
  top: ${({ device }) => (device === 'MOBILE' ? '20px' : '150px')};
  right: ${({ device }) => (device === 'MOBILE' ? '0px' : '48px')};
  left: ${({ device }) => (device === 'MOBILE' ? '0px' : 'initial')};
  transform: ${({ device }) => (device === 'MOBILE' ? 'translateX(-50%)' : 'initial')};
  background-color: #fff;
  width: auto;
  margin: ${({ device }) => (device === 'MOBILE' ? '0 20px' : 'auto')};
  padding: 20px 16px;
  border-radius: 8px;
  z-index: 1000;
  opacity: 0;
  animation: ${({ device }) => (device === 'MOBILE' ? 'fadeInOutMobile' : 'fadeInOut')} 3s
    ease forwards;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateX(80px);
    }
    10% {
      opacity: 1;
      transform: translateX(0);
    }
    90% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(80px);
    }
  }

  @keyframes fadeInOutMobile {
    0% {
      opacity: 0;
      transform: translateY(-80px);
    }
    10% {
      opacity: 1;
      transform: translateY(0);
    }
    90% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-80px);
    }
  }
`;
