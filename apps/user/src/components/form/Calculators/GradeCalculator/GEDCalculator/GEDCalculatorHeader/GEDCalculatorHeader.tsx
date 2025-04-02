import { Th } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

const GEDCalculatorHeader = () => {
  return (
    <StyledGEDCalculatorHeader>
      <Th borderTopLeftRadius={12} width="15.1%" height={64}>
        과목
      </Th>
      <Th width="69.8%" height={64}>
        성적
      </Th>
      <Th borderTopRightRadius={12} width="15.1%" height={64}>
        삭제
      </Th>
    </StyledGEDCalculatorHeader>
  );
};

export default GEDCalculatorHeader;

const StyledGEDCalculatorHeader = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 100%;
`;
