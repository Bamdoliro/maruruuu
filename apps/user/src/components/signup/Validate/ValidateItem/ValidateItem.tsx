import { color } from '@maru/design-system';
import { IconSignUpCheckFalse, IconSignUpCheckTrue } from '@maru/icon';
import { Row, Text } from '@maru/ui';

interface ValidateItem {
  condition: boolean;
  text: string;
}

const ValidateItem = ({ condition, text }: ValidateItem) => {
  return (
    <Row alignItems="center">
      {condition ? <IconSignUpCheckTrue /> : <IconSignUpCheckFalse />}
      <Text fontType="caption" color={condition ? color.maruDefault : color.gray400}>
        {text}
      </Text>
    </Row>
  );
};

export default ValidateItem;
