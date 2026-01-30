import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

const TableItem = ({ children, onClick }: Props) => {
  return <StyledListItem onClick={onClick}>{children}</StyledListItem>;
};

export default TableItem;

const StyledListItem = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  min-width: fit-content;
  height: 64px;
  padding: 0px 56px 0px 32px;
  border-radius: 12px;

  background: ${color.white};
  border: 1px solid ${color.gray200};

  user-select: none;
`;
