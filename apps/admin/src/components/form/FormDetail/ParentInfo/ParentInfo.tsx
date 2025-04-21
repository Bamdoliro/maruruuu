import { DataBox } from '@/components/common';
import { useFormDetailQuery } from '@/services/form/queries';
import { formatPhoneNumber } from '@/utils';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface ParentInfoProps {
  id: number;
}

const ParentInfo = ({ id }: ParentInfoProps) => {
  const { data: formDetailData } = useFormDetailQuery(id);
  if (!formDetailData) return <Loader />;

  const parentDetails = [
    { label: '이름', data: formDetailData.parent.name },
    { label: '전화번호', data: formatPhoneNumber(formDetailData.parent.phoneNumber) },
    { label: '보호자 관계', data: formDetailData.parent.relation },
    { label: '주소', data: formDetailData.parent.address },
    { label: '상세 주소', data: formDetailData.parent.detailAddress },
    { label: '우편 번호', data: formDetailData.parent.zoneCode },
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
