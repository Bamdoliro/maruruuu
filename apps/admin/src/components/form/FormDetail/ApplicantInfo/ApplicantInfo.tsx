import { DataBox } from '@/components/common';
import { Row } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';



const ApplicantInfo = () => {
  return (
    <StyledApplicantInfo>
      {applicantData.map((item, index) => (
        <GridItem key={index}>
          <DataBox label={item.label} data={item.data} />
        </GridItem>
      ))}
    </StyledApplicantInfo>
  );
};
export default ApplicantInfo;

const StyledApplicantInfo = styled.div`
  ${flex({ flexDirection: 'column' })}
  padding: 48px 0;
  gap: 24px;
`;

const GridItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;
