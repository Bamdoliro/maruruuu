import { color } from '@maru/design-system';
import { IconTerms } from '@maru/icon';
import { Column, Row, Text } from '@maru/ui';
import { ReactNode } from 'react';

interface PolicyRouleProps {
  title: string;
  children: ReactNode;
}

const PolicyRoule = ({ title, children }: PolicyRouleProps) => {
  return (
    <Column gap={8}>
      <Row gap={8} alignItems='center'>
        <IconTerms />
        <Text fontType="H4" color={color.gray900}>
            {title}
        </Text>
      </Row>
      {children}
    </Column>
  );
};

export default PolicyRoule;
