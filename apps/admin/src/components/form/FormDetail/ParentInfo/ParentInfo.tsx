import { DataBox } from '@/components/common';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface ParentInfoProps {
  parentData?: {
    name: string;
    phoneNumber: string;
    relation: string;
    address: string;
    detailAddress: string;
    zoneCode: string;
  };
}

const ParentInfo = ({ parentData }: ParentInfoProps) => {
  if (!parentData) return <Loader />;

  const parentDetails = [
    { label: '이름', data: parentData.name },
    { label: '전화번호', data: parentData.phoneNumber },
    { label: '보호자 관계', data: parentData.relation },
    { label: '주소', data: parentData.address },
    { label: '상세 주소', data: parentData.detailAddress },
    { label: '우편 번호', data: parentData.zoneCode },
  ];

  return (
    <StyledParentInfo>
      <GridContainer>
        {parentDetails.map((item, index) => (
          <GridItem key={index}>
            <DataBox label={item.label} data={item.data} />
          </GridItem>
        ))}
      </GridContainer>
    </StyledParentInfo>
  );
};
export default ParentInfo;

const StyledParentInfo = styled.div`
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
