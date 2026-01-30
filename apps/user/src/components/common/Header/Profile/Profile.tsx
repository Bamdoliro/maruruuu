import styled from '@emotion/styled';
import { flex } from '@maru/utils';
import { color, font } from '@maru/design-system';
import { IconArrowDropdown } from '@maru/icon';
import { useBooleanState, useOutsideClick } from '@maru/hooks';
import { Text } from '@maru/ui';
import { useUser } from '@/hooks';
import { useCTAButton } from './Profile.hook';

interface ProfileProps {
  status?: string;
}

const Profile = ({ status }: ProfileProps) => {
  const {
    value: isMenuOpen,
    toggle: toggleMenuOpen,
    setFalse: closeMenu,
  } = useBooleanState();
  const profileRef = useOutsideClick(closeMenu);
  const { userData } = useUser();
  const {
    handleMoveForm,
    handleMoveManagement,
    handleMoveSimulation,
    handleMoveInquiry,
    handleLogout,
    handleMoveChangePassword,
    handleMoveWithdrawal,
  } = useCTAButton(status);

  return (
    <StyledProfile ref={profileRef}>
      <ProfileButton onClick={toggleMenuOpen}>
        <Text fontType="H5" color={color.gray900}>
          {userData.name} 님
        </Text>
        <IconArrowDropdown color={color.gray500} width={24} height={24} />
      </ProfileButton>
      {isMenuOpen && (
        <MenuListBox>
          <MenuList>
            <UserInfo>
              <Text fontType="H5" color={color.gray900}>
                {userData.name} 님
              </Text>
              <Text fontType="p3" color={color.gray500}>
                @{userData.phoneNumber}
              </Text>
            </UserInfo>
            <MenuListItem>
              <MenuItem onClick={handleMoveForm}>이어서 원서 작성하기</MenuItem>
              <MenuItem onClick={handleMoveManagement}>원서 관리</MenuItem>
              <MenuItem onClick={handleMoveSimulation}>성적 모의 계산</MenuItem>
            </MenuListItem>
            <MenuItem onClick={handleMoveInquiry}>마루 문의하기</MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            <MenuItem onClick={handleMoveChangePassword}>비밀번호 변경</MenuItem>
            <MenuItem onClick={handleMoveWithdrawal}>회원탈퇴</MenuItem>
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

const MenuListItem = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })}
  width: 100%;
  height: 168px;
  padding: 12px 0px;
  margin-bottom: 12px;
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
