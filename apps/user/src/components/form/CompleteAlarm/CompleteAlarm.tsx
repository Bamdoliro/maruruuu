import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  text: string;
}

const CompleteAlarm = ({ text, icon }: Props) => {
  return (
    <Column
      style={{ marginTop: '173px' }}
      width="100%"
      height="100%"
      gap={34}
      alignItems="center"
    >
      {icon}
      <Text fontType="D2" color={color.gray900}>
        {text}
      </Text>
    </Column>
  );
};

export default CompleteAlarm;
