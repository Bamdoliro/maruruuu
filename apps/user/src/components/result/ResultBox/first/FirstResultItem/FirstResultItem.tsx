import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';

interface FirstResultItemProps {
  type?: string;
  isPassed?: boolean;
  changedToRegular?: boolean;
}

const FirstResultItem = ({ type, isPassed, changedToRegular }: FirstResultItemProps) => {
  const passedType = changedToRegular ? '특별 전형 → 일반 전형' : type;

  return (
    <StyledFirstResultItem>
      {isPassed ? (
        <Text fontType="p1" color={color.gray600}>
          {passedType}
        </Text>
      ) : null}
      <Text fontType="H2" color={color.maruDefault}>
        {isPassed ? '합격을 축하합니다!' : '합격자 명단에 없습니다.'}
      </Text>
    </StyledFirstResultItem>
  );
};

export default FirstResultItem;

const StyledFirstResultItem = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  background-color: ${color.white};
  padding-top: 32px;
`;
