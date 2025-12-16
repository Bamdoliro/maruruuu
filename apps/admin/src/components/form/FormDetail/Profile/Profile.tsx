import { FORM_TYPE_CATEGORY } from '@/constants/form/constant';
import { useFormDetailQuery } from '@/services/form/queries';
import { formatPhoneNumber } from '@/utils';
import { color } from '@maru/design-system';
import { IconBadge, IconCall, IconPerson, IconSchool } from '@maru/icon';
import { Column, Loader, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface ProfileProps {
  id: number;
}

const Profile = ({ id }: ProfileProps) => {
  const { data: formDetailData } = useFormDetailQuery(id);
  if (!formDetailData) return <Loader />;

  const profileDetails = [
    {
      icon: <IconBadge width={24} height={24} />,
      value: formDetailData.examinationNumber,
    },
    {
      icon: <IconPerson width={24} height={24} />,
      value: formDetailData.type
        ? formDetailData.changedToRegular && formDetailData?.type === 'REGULAR'
          ? '특별전형 ⭢ 일반전형'
          : FORM_TYPE_CATEGORY[formDetailData.type]
        : null,
    },
    {
      icon: <IconSchool width={24} height={24} />,
      value:
        formDetailData.education.graduationType !== 'QUALIFICATION_EXAMINATION'
          ? formDetailData.education.schoolName || '학교 이름 없음'
          : '검정고시',
    },
    {
      icon: <IconCall width={24} height={24} />,
      value: formatPhoneNumber(formDetailData.applicant.phoneNumber),
    },
  ];

  return (
    <StyledProfile>
      <ProfileImageBox>
        <ProfileImage
          src={formDetailData.applicant.identificationPictureUri}
          alt="profile-image"
          width={280}
          height={280}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </ProfileImageBox>
      <Column gap={16}>
        <Text fontType="H2" color={color.gray900}>
          {formDetailData.applicant.name}
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

const ProfileImage = styled.img`
  border-radius: 999px;
`;
