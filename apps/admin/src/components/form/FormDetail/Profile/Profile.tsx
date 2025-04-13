import { color } from '@maru/design-system';
import { IconBadge, IconCall, IconPerson, IconSchool } from '@maru/icon';
import { Column, Loader, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import Image from 'next/image';
import { styled } from 'styled-components';

interface ProfileProps {
  profileData?: {
    profileImageUrl: string;
    name: string;
    phoneNumber: string;
    examinationNumber: number | string;
    type: string;
    schoolName: string;
  };
}

const Profile = ({ profileData }: ProfileProps) => {
  if (!profileData) return <Loader />;

  const profileDetails = [
    {
      icon: <IconBadge width={24} height={24} />,
      value: profileData.examinationNumber,
    },
    {
      icon: <IconPerson width={24} height={24} />,
      value: profileData.type,
    },
    {
      icon: <IconSchool width={24} height={24} />,
      value: profileData.schoolName,
    },
    {
      icon: <IconCall width={24} height={24} />,
      value: profileData.phoneNumber,
    },
  ];

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
        <Column gap={8}>
          {profileDetails.map((item, index) => (
            <Row key={index} gap={10}>
              {item.icon}
              <Text fontType="p2" color={color.gray900}>
                {item.value}
              </Text>
            </Row>
          ))}
        </Column>
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
