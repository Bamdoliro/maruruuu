import { color, font } from '@maru/design-system';
import { IconArrowBottom, IconArrowTop } from '@maru/icon';
import { flex } from '@maru/utils';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface RecipientDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const MAIN_OPTIONS = [
  { value: 'FINAL_SUBMITTED', label: '최종 제출된 원서' },
  { value: 'APPROVED', label: '원서 승인 완료자' },
  { value: 'REJECTED', label: '원서 반려자' },
  {
    value: 'FIRST_PASSED',
    label: '1차 합격자',
    hasSubMenu: true,
    subOptions: [
      { value: 'MEISTER_TALENT', label: '마이스터인재전형' },
      { value: 'REGULAR', label: '일반전형' },
      { value: 'ALL', label: '전체 1차 합격자' },
    ],
  },
  { value: 'FINAL_PASSED', label: '최종 합격자' },
];

const RecipientDropdown = ({ value, onChange }: RecipientDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getSelectedLabel = () => {
    for (const option of MAIN_OPTIONS) {
      if (option.value === value) return option.label;
      if (option.subOptions) {
        const subOption = option.subOptions.find((sub) => sub.value === value);
        if (subOption) return subOption.label;
      }
    }
    return '';
  };

  return (
    <Container ref={dropdownRef}>
      <Button onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen} $hasValue={!!value}>
        <span>받는 사람</span>
        {isOpen ? (
          <IconArrowTop color={color.gray600} width={24} height={24} />
        ) : (
          <IconArrowBottom color={color.gray600} width={24} height={24} />
        )}
      </Button>
      {isOpen && (
        <Menu>
          {MAIN_OPTIONS.map((option) => (
            <MenuItem key={option.value}>
              <MenuButton
                onClick={() => {
                  if (!option.hasSubMenu) {
                    onChange(option.value);
                    setIsOpen(false);
                  }
                }}
              >
                {option.label}
              </MenuButton>
              {option.hasSubMenu && option.subOptions && (
                <SubMenu>
                  {option.subOptions.map((subOption) => (
                    <MenuButton
                      key={subOption.value}
                      onClick={() => {
                        onChange(subOption.value);
                        setIsOpen(false);
                      }}
                    >
                      {subOption.label}
                    </MenuButton>
                  ))}
                </SubMenu>
              )}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Container>
  );
};

export default RecipientDropdown;

const Container = styled.div`
  position: relative;
  width: 200px;
`;

const Button = styled.button<{ $isOpen: boolean; $hasValue: boolean }>`
  ${font.p2}
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  width: 100%;
  height: 40px;
  padding: 0 16px;
  background-color: ${color.white};
  border: 1px solid ${({ $isOpen }) => ($isOpen ? color.maruDefault : color.gray400)};
  border-radius: 6px;
  color: ${({ $hasValue }) => ($hasValue ? color.gray900 : color.gray500)};
  text-align: left;

  &:hover {
    border-color: ${color.maruDefault};
  }
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 16px);
  left: 0;
  width: 200px;
  background-color: ${color.white};
  border: 1px solid ${color.gray200};
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 1000;
`;

const MenuItem = styled.div`
  position: relative;

  &:hover > div {
    display: block;
  }
`;

const MenuButton = styled.button`
  ${font.p2}
  width: 100%;
  height: 48px;
  padding: 0 16px;
  text-align: left;
  background: none;
  border: none;
  color: ${color.gray900};
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${color.gray50};
  }
`;

const SubMenu = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  width: 200px;
  background-color: ${color.white};
  border: 1px solid ${color.gray200};
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 1000;
`;
