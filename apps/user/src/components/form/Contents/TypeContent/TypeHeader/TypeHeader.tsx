import { Th } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

const TypeHeader = () => {
  return (
    <StyledTypeHeader>
      <Th width="calc(736px/3)" height={56} borderTopLeftRadius={12}>
        전형
      </Th>
      <Th width="calc(736px/3)" height={56}>
        유형
      </Th>
      <Th width="calc(736px/3)" height={56}>
        구분
      </Th>
      <Th width={80} height={56} borderTopRightRadius={12}>
        선택
      </Th>
    </StyledTypeHeader>
  );
};

export default TypeHeader;

const StyledTypeHeader = styled.div`
  ${flex({ flexDirection: 'row', alignItems: 'center' })}
  width: 100%;
`;
