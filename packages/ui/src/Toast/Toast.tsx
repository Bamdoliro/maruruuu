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
}

const Toast = ({ children, width, type }: ToastProps) => {
  return (
    <StyledToast style={{ width }}>
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

const StyledToast = styled.div`
  ${flex({
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  })}
  position: fixed;
  gap: 8px;
  top: 150px;
  right: 48px;
  background-color: #fff;
  width: auto;
  padding: 20px 16px;
  border-radius: 8px;
  z-index: 1000;
  opacity: 0;
  animation: fadeInOut 3s ease forwards;
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
`;
