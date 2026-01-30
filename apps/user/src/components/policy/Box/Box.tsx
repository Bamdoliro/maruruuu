import { color } from '@maru/design-system';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';

interface BoxProps {
  color: string;
  children: ReactNode;
}

const Box = ({ color, children }: BoxProps) => {
  return <StyledBox color={color}>{children}</StyledBox>;
};

export default Box;

const StyledBox = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;
  padding: 14px 60px;
  border-radius: 6px;
  border: 1px solid ${color.gray400};
  background: ${(props) => props.color};
`;
