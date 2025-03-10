import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { ReactNode } from 'react';

interface CompleteAlarmProps {
  isComplete: boolean | string;
  completeText: string;
  inCompleteText?: string;
  completeIcon: ReactNode;
  inCompleteIcon?: ReactNode;
}

const CompleteAlarm = ({
  isComplete,
  completeText,
  inCompleteText,
  completeIcon,
  inCompleteIcon,
}: CompleteAlarmProps) => {
  return (
    <Column
      style={{ marginTop: '173px' }}
      width="100%"
      height="100%"
      gap={34}
      alignItems="center"
    >
      {isComplete ? completeIcon : inCompleteIcon}
      <Text fontType="D2" color={color.gray900}>
        {isComplete ? completeText : inCompleteText}
      </Text>
    </Column>
  );
};

export default CompleteAlarm;
