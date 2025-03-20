import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { css, styled } from 'styled-components';
import { ReactNode } from 'react';
import { IconArrowTop, IconArrowBottom } from '@maru/icon';
import { useBooleanState } from '@maru/hooks';

interface Data {
  icon: ReactNode;
  label: string;
  value: string;
  onClick: () => void;
}

interface FunctionDropdownProps {
  data: Data[];
}

const FunctionDropdown = ({ data }: FunctionDropdownProps) => {
  const {
    value: isOpen,
    setFalse: closeDropdown,
    toggle: handleToggleButtonClick,
  } = useBooleanState();

  return (
    <StyledFunctionDropdown isOpen={isOpen} onClick={handleToggleButtonClick}>
      <Text fontType="p2" color={color.gray700}>
        추가 기능
      </Text>
      {isOpen ? (
        <IconArrowTop color={color.gray600} width={24} height={24} />
      ) : (
        <IconArrowBottom color={color.gray600} width={24} height={24} />
      )}
      <DropdownItemListBox isOpen={isOpen}>
        <DropdownItemList>
          {data.map((item, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                item.onClick();
                closeDropdown();
              }}
            >
              {item.icon}
              <Text fontType="p2" color={color.gray900}>
                {item.label}
              </Text>
            </DropdownItem>
          ))}
        </DropdownItemList>
      </DropdownItemListBox>
    </StyledFunctionDropdown>
  );
};
export default FunctionDropdown;

const StyledFunctionDropdown = styled.div<{ isOpen: boolean }>`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  width: 120px;
  height: 40px;
  padding: 0 10px 0 16px;
  border-radius: 6px;
  background: ${color.white};
  border: 1px solid ${({ isOpen }) => (isOpen ? color.maruDefault : color.gray400)};
  ${({ isOpen }) =>
    isOpen &&
    css`
      outline: 2px solid ${color.maruLightBlue};
    `}
`;

const DropdownItemListBox = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const DropdownItemList = styled.div`
  ${flex({
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  })}
  z-index: 1;
  position: absolute;
  right: -12px;
  margin-top: 24px;
  width: 280px;
  padding: 8px;
  background-color: ${color.white};
  border: 1px solid ${color.gray200};
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
`;

const DropdownItem = styled.button`
  ${flex({ alignItems: 'center' })}
  gap: 12px;
  width: 100%;
  height: 44px;
  padding: 0 8px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${color.gray100};
  }
`;
