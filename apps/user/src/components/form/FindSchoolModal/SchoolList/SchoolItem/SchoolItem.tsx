import { IconCheck } from '@maru/icon';
import { color, font } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled, { css } from 'styled-components';
import { School } from '@/types/form/client';

interface Props {
  school: School;
  selected: boolean;
  onClick: () => void;
}

export const SchoolItem = ({ school, selected, onClick }: Props) => {
  return (
    <StyledSchoolItem selected={selected} onClick={onClick}>
      <SchoolName>
        {selected && <IconCheck color={color.maruDefault} width={24} height={24} />}
        {school.name}
      </SchoolName>
      <Text fontType="caption" color={color.gray600}>
        {school.location}
      </Text>
    </StyledSchoolItem>
  );
};

const StyledSchoolItem = styled.div<{ selected: boolean }>`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  height: 56px;
  padding: 15px 16px;
  border-radius: 6px;
  background: ${color.gray50};
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      padding: 15px 15px;
      border: 1px solid ${color.maruDefault};
    `}
`;

const SchoolName = styled.p`
  ${font.p2}
  color: ${color.gray900};
  ${flex({ alignItems: 'center' })}
  gap: 4px;
`;
