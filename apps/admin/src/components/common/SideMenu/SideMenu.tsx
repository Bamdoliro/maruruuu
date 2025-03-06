import { color, font } from '@maru/design-system';
import { flex } from '@maru/utils';
import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface SideMenuProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const SideMenu = ({ children, isActive, onClick }: SideMenuProps) => {
  <StyledSideMenu isActive={isActive} onClick={onClick}>
    {children}
  </StyledSideMenu>;
};
export default SideMenu;

const StyledSideMenu = styled.button<{ isActive: boolean }>`
  ${flex({ alignItems: 'center' })}
  width: 200px;
  height: 56px;
  padding: 0px 16px;
  border-radius: 12px;

  ${font.H5}
  color: ${color.gray600}

  &:hover {
    color: ${color.gray700}
    background: ${color.gray100}
  }

  ${(props) =>
    props.isActive &&
    css`
      color: ${color.maruDefault};
      background: ${color.gray100};
    `}
`;
