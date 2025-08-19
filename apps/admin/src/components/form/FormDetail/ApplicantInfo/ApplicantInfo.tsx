import { DataBox } from '@/components/common';
import { GENDER } from '@/constants/form/constant';
import { useFormDetailQuery } from '@/services/form/queries';
import { formatDate, formatPhoneNumber } from '@/utils';
import { color } from '@maru/design-system';
import { Loader, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface ApplicantInfoProps {
  id: number;
}

const ApplicantInfo = ({ id }: ApplicantInfoProps) => {
  const { data: formDetailData } = useFormDetailQuery(id);
  if (!formDetailData) return <Loader />;

  const applicantDetails = [
    { label: '이름', data: formDetailData.applicant.name },
    {
      label: '생년월일',
      data: formatDate.toShortDateTime(formDetailData.applicant.birthday),
    },
    { label: '성별', data: GENDER[formDetailData.applicant.gender] },
    { label: '전화번호', data: formatPhoneNumber(formDetailData.applicant.phoneNumber) },
  ];

  return (
    <StyledApplicantInfo>
      <GridContainer>
        {applicantDetails.map((item, index) => (
          <GridItem key={index}>
            <DataBox label={item.label} data={item.data} />
          </GridItem>
        ))}
        <ProfileImageBox>
          <Text fontType="H4" color={color.gray900}>
            증명사진
          </Text>
          <ProfileImage
            src={formDetailData.applicant.identificationPictureUri}
            alt="profile-image"
            width={280}
            height={354}
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </ProfileImageBox>
      </GridContainer>
    </StyledApplicantInfo>
  );
};
export default ApplicantInfo;

const StyledApplicantInfo = styled.div`
  ${flex({ flexDirection: 'column' })}
  padding: 48px 0;
  gap: 24px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

const GridItem = styled.div``;

const ProfileImageBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })}
  width: 100%;
  min-width: 400px;
  padding: 24px;
  gap: 16px;

  border-radius: 12px;
  border: 1px solid ${color.gray200};
  background: ${color.white};
`;

const ProfileImage = styled.img`
  background: ${color.gray100};
`;
