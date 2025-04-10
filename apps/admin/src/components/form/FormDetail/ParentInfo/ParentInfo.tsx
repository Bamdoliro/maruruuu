import { DataBox } from '@/components/common';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

const ParentInfo = () => {
  return (
    <StyledParentInfo>
      <GridContainer></GridContainer>
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
