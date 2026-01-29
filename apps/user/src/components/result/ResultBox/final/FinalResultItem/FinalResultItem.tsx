import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';

interface FirstResultItemProps {
  isPassed?: boolean;
}

const FinalResultItem = ({ isPassed }: FirstResultItemProps) => {
  return (
    <StyledFinalResultItem>
      <Text fontType="H2" color={color.maruDefault}>
        {isPassed ? '합격을 축하합니다.' : '합격자 명단에 없습니다.'}
      </Text>
    </StyledFinalResultItem>
  );
};

export default FinalResultItem;

const StyledFinalResultItem = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  background-color: ${color.white};
  padding-top: 32px;
`;
