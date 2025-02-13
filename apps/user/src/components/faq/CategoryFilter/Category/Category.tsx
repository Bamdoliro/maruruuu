import { color, font } from '@maru/design-system';
import { flex } from '@maru/utils';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface CategoryProps {
  children: ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const Category = ({ children, isSelected, onClick }: CategoryProps) => {
  return (
    <StyledCategory onClick={onClick} $isSelected={isSelected}>
      {children}
    </StyledCategory>
  );
};

export default Category;

const StyledCategory = styled.button<{ $isSelected: boolean }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  height: 100%;
  padding: 0px 14px;
  border-radius: 25px;
  ${font.context}
  color: ${(props) => (props.$isSelected ? color.maruDefault : color.gray900)};
  background-color: ${(props) => (props.$isSelected ? '#EFF5FF' : color.gray100)};
  cursor: pointer;
`;
