import { flex } from '@maru/utils';
import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';
import styled from '@emotion/styled';
import Text from '../Text/Text';
import { color } from '@maru/design-system';
import { IconCancelCircle, IconCheckCircle } from '@maru/icon';

interface ToastProps {
  children: ReactNode;
  width?: CSSProperties['width'];
  type: 'ERROR' | 'SUCCESS';
  device?: 'MOBILE' | 'COMPUTER';
  progress?: number;
  onClose?: () => void;
}

const Toast = ({
  children,
  width,
  type,
  device = 'COMPUTER',
  progress = 0,
}: ToastProps) => {
  return (
    <StyledToast style={{ width }} device={device}>
      <StyledToastContent>
        {type === 'ERROR' ? (
          <IconCancelCircle width={32} height={32} />
        ) : (
          <IconCheckCircle width={32} height={32} />
        )}
        <Text fontType="p2" color={color.gray900}>
          {children}
        </Text>
      </StyledToastContent>
      <StyledProgressBar>
        <StyledProgressFill progress={progress} type={type} />
      </StyledProgressBar>
    </StyledToast>
  );
};

export default Toast;

const StyledToast = styled.div<{ device: 'MOBILE' | 'COMPUTER' }>`
  ${flex({
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  })}
  position: relative;
  background-color: #fff;
  width: ${({ device }) => (device === 'MOBILE' ? 'calc(100% - 40px)' : 'auto')};
  min-width: 320px;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: slideIn 0.3s ease forwards;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: ${({ device }) =>
        device === 'MOBILE' ? 'translateY(-20px)' : 'translateX(20px)'};
    }
    to {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
`;

const StyledToastContent = styled.div`
  ${flex({
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  })}
  gap: 8px;
  padding: 20px 16px;
`;

const StyledProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${color.gray200};
  position: relative;
  overflow: hidden;
`;

const StyledProgressFill = styled.div<{ progress: number; type: 'ERROR' | 'SUCCESS' }>`
  height: 100%;
  width: ${({ progress }) => `${progress * 100}%`};
  background-color: ${({ type }) => (type === 'ERROR' ? color.red : color.maruDefault)};
  transition: width 0.1s linear;
`;
