import { DataBox } from '@/components/common';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface ApplicantInfoProps {
  applicantData?: {
    name: string;
    birthday: string;
    gender: string;
    phoneNumber: string;
    profileImageUrl: string;
  };
}

const ApplicantInfo = ({ applicantData }: ApplicantInfoProps) => {
  if (!applicantData) return <Loader />;

  const applicantDetails = [
    { label: '이름', data: applicantData.name },
    { label: '생년월일', data: applicantData.birthday },
    { label: '성별', data: applicantData.gender },
    { label: '전화번호', data: applicantData.phoneNumber },
  ];

  return (
    <StyledApplicantInfo>
      <GridContainer>
        {applicantDetails.map((item, index) => (
          <GridItem key={index}>
            <DataBox label={item.label} data={item.data} />
          </GridItem>
        ))}
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
