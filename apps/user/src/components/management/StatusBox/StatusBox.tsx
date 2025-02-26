import { useUser } from '@/hooks';
import { color, font } from '@maru/design-system';
import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { getStatusConfig } from './StatusBox.config';
import StatusIcon from './StatusIcon';

interface StatusBoxProps {
  height: string;
  status: string;
}

const StatusBox = ({ height, status }: StatusBoxProps) => {
  const { userData } = useUser();
  const { text, script } = getStatusConfig(status, userData.name);

  return (
    <StyledStatusBox height={height}>
      <Row alignItems="flex-start" justifyContent="space-between" width="100%">
        <Column gap={8}>
          <Text fontType="H6" color={color.gray600}>
            원서 상태
          </Text>
          <Text fontType="H1" color={color.gray900}>
            {text}
          </Text>
        </Column>
        <StatusIcon status={status} />
      </Row>
      <ScriptText dangerouslySetInnerHTML={{ __html: script }} />
    </StyledStatusBox>
  );
};

export default StatusBox;

const StyledStatusBox = styled.div<{ height: string }>`
  ${flex({
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  })}
  width: 100%;
  height: ${({ height }) => height};
  padding: 32px 36px;
  border-radius: 12px;
  border: 1px solid ${color.gray200};
  background-color: ${color.white};
`;

const ScriptText = styled.div`
  ${font.p2}
  color: ${color.gray600};
`;
