import { DataBox } from '@/components/common';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface TypeInfoProps {
  typeData?: string;
}

const TypeInfo = ({ typeData }: TypeInfoProps) => {
  if (!typeData) return <Loader />;

  const typeDetails = [{ label: '전형 선택', data: typeData }];

  return (
    <StyledTypeInfo>
      <GridContainer>
        {typeDetails.map((item, index) => (
          <GridItem key={index}>
            <DataBox label={item.label} data={item.data} />
          </GridItem>
        ))}
      </GridContainer>
    </StyledTypeInfo>
  );
};
export default TypeInfo;

const StyledTypeInfo = styled.div`
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
