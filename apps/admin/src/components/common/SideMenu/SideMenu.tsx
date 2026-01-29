import { color, font } from '@maru/design-system';
import { flex } from '@maru/utils';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface SideMenuProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const SideMenu = ({ children, isActive, onClick }: SideMenuProps) => {
  return (
    <StyledSideMenu isActive={isActive} onClick={onClick}>
      {children}
    </StyledSideMenu>
  );
};

export default SideMenu;

const StyledSideMenu = styled.button<{ isActive: boolean }>`
  ${flex({ alignItems: 'center' })}
  width: 160px;
  height: 44px;
  padding: 0px 16px;
  border-radius: 8px;

  ${font.btn3}
  color: ${color.gray600};

  &:hover {
    background: ${color.gray100};
  }

  ${(props) =>
    props.isActive &&
    css`
      color: ${color.maruDefault};
      background: ${color.gray100};
    `}
`;
