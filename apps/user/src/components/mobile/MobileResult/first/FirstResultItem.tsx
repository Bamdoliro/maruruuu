import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';

interface FirstResultItemProps {
  type?: string;
  isPassed?: boolean;
  changedToRegular?: boolean;
}

const FirstResultItem = ({ type, isPassed, changedToRegular }: FirstResultItemProps) => {
  const passedType = changedToRegular ? '특별 전형 → 일반 전형' : type;

  return (
    <Column alignItems="center">
      {isPassed ? (
        <Text fontType="p3" color={color.gray600}>
          {passedType}
        </Text>
      ) : null}
      <Text fontType="H4" color={color.maruDefault}>
        {isPassed ? '합격을 축하합니다!' : '합격자 명단에 없습니다.'}
      </Text>
    </Column>
  );
};

export default FirstResultItem;
