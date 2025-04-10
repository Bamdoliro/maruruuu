import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import Image from 'next/image';
import { styled } from 'styled-components';

interface ProfileProps {
  profileData: {
    profileImageUrl: string;
    name: string;
    phoneNumber: string;
    examinationNumber: number;
    type: string;
    schoolName: string;
  };
}

const Profile = ({ profileData }: ProfileProps) => {
  return (
    <StyledProfile>
      <ProfileImageBox>
        <ProfileImage
          src={profileData.profileImageUrl}
          alt="profile-image"
          width={280}
          height={280}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </ProfileImageBox>
      <Column gap={16}>
        <Text fontType="H2" color={color.gray900}>
          {profileData.name}
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
