import styled from 'styled-components';
import { flex } from '@maru/utils';
import { color, font } from '@maru/design-system';
import { IconArrowDropdown } from '@maru/icon';
import { useBooleanState, useOutsideClick } from '@maru/hooks';
import { Text } from '@maru/ui';

const Profile = () => {
  const {
    value: isMenuOpen,
    toggle: toggleMenuOpen,
    setFalse: closeMenu,
  } = useBooleanState();
  const profileRef = useOutsideClick(closeMenu);

  return (
    <StyledProfile ref={profileRef}>
      <ProfileButton onClick={toggleMenuOpen}>
        <Text fontType="H5" color={color.gray900}>
          정홍섭 님
        </Text>
        <IconArrowDropdown color={color.gray600} width={24} height={24} />
      </ProfileButton>
      {isMenuOpen && (
        <MenuListBox>
          <MenuList>
            <UserInfo>
              <Text fontType="H5" color={color.gray900}>
                정홍섭 님
              </Text>
              <Text fontType="p3" color={color.gray500}>
                @01082372487
              </Text>
            </UserInfo>
            <MenuItem>이어서 원서 작성하기</MenuItem>
            <MenuItem>원서 관리</MenuItem>
            <MenuItem>성적 모의 계산</MenuItem>
            <MenuItem>로그아웃</MenuItem>
          </MenuList>
        </MenuListBox>
      )}
    </StyledProfile>
  );
};

export default Profile;

const StyledProfile = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'flex-end' })}
  min-width: 240px;
`;

const ProfileButton = styled.button`
  ${flex({ alignItems: 'center' })}
  cursor: pointer;
`;

const MenuListBox = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  z-index: 2;
`;

const MenuList = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 10px;
  background-color: ${color.white};
  border-radius: 12px;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  padding-bottom: 12px;
`;

const UserInfo = styled.div`
  ${flex({ alignItems: 'center' })}
  height: 72px;
  padding: 0px 24px;
  gap: 16px;
  border-bottom: 1px solid ${color.gray200};
`;

const MenuItem = styled.div`
  ${font.p2}
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 48px;
  padding: 9px 24px;
  cursor: pointer;

  &:hover {
    background-color: ${color.gray100};
  }
`;
