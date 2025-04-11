import { DataBox } from '@/components/common';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface EducationInfoProps {
  educationData?: {
    graduationType: string;
    schoolName: string;
    graduationYear: string;
    schoolLocation: string;
    schoolCode: string;
    schoolPhoneNumber: string;
    teacherName: string;
    teacherMobilePhoneNumber: string;
  };
}

const EducationInfo = ({ educationData }: EducationInfoProps) => {
  if (!educationData) return <Loader />;

  const educationDetails = [
    { label: '졸업 구분', data: educationData.graduationType },
    { label: '출신 학교명', data: educationData.schoolName },
    { label: '졸업년도, 합격년도', data: educationData.graduationYear },
    { label: '학교 지역', data: educationData.schoolLocation },
    { label: '표준학교코드', data: educationData.schoolCode },
    { label: '학교 연락처', data: educationData.schoolPhoneNumber },
    { label: '작성교사 이름', data: educationData.teacherName },
    { label: '작성교사 연락처', data: educationData.teacherMobilePhoneNumber },
  ];

  return (
    <StyledEducationInfo>
      <GridContainer>
        {educationDetails.map((item, index) => (
          <GridItem key={index}>
            <DataBox label={item.label} data={item.data} />
          </GridItem>
        ))}
      </GridContainer>
    </StyledEducationInfo>
  );
};
export default EducationInfo;

const StyledEducationInfo = styled.div`
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
