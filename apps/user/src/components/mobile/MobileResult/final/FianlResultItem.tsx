import { color } from '@maru/design-system';
import { Text } from '@maru/ui';

interface FinalResultItemProps {
  isPassed?: boolean;
}

const FinalResultItem = ({ isPassed }: FinalResultItemProps) => {
  return (
    <Text fontType="H2" color={color.maruDefault}>
      {isPassed ? '합격을 축하합니다.' : '합격자 명단에 없습니다.'}
    </Text>
  );
};

export default FinalResultItem;
