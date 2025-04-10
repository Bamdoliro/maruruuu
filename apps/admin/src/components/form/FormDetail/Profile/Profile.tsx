import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import Image from 'next/image';
import { styled } from 'styled-components';

const Profile = () => {
  return (
    <StyledProfile>
      <ProfileImageBox>
        <ProfileImage />
      </ProfileImageBox>
      <Column gap={16}>
        <Text fontType="H2" color={color.gray900}>
          {'이름'}
        </Text>
        <Column gap={8}>{`번호, 전형, 학교, 전번`}</Column>
      </Column>
    </StyledProfile>
  );
};
export default Profile;

const StyledProfile = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 8px;
`;

const ProfileImageBox = styled.div`
  width: 280px;
  height: 280px;
`;

const ProfileImage = styled(Image)`
  border-radius: 999px;
`;
