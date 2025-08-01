import { formatApplicationDate, formatStartDate, formatStatus } from '@/utils';
import { color } from '@maru/design-system';
import { Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

interface FairItemProps {
  id: number;
  start: string;
  place: string;
  applicationStartDate: string;
  applicationEndDate: string;
  status: string;
  onClick: (id: number) => void;
}

const FairItem = ({
  id,
  start,
  place,
  applicationStartDate,
  applicationEndDate,
  status,
  onClick,
}: FairItemProps) => {
  return (
    <StyledFairItem onClick={() => onClick(id)}>
      <Row gap={30} alignItems="center">
        <Text fontType="H3" color={color.gray900}>
          {formatStartDate(start)}
        </Text>
        <StatusBox status={status}>
          <Text fontType="code" color={color.maruDefault}>
            {formatStatus(status)}
          </Text>
        </StatusBox>
      </Row>
      <Text fontType="p2" color={color.gray500}>
        <EllipsisText as="span">장소: {place}</EllipsisText>
        <br />
        신청 기한: {formatApplicationDate(applicationStartDate)} ~{' '}
        {formatApplicationDate(applicationEndDate)}
      </Text>
    </StyledFairItem>
  );
};

export default FairItem;

const StyledFairItem = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 100%;
  max-width: 400px;
  height: 180px;
  padding: 28px 32px;
  background-color: ${color.white};
  border: 1px solid ${color.gray200};
  border-radius: 12px;
  margin-bottom: 16px;
  margin-right: 16px;
  cursor: pointer;
`;

const StatusBox = styled.div<{ status: string }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 80px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid
    ${({ status }) =>
      status === 'APPLICATION_IN_PROGRESS' ? color.maruDefault : color.red};
  background-color: ${({ status }) =>
    status === 'APPLICATION_IN_PROGRESS'
      ? 'rgba(37, 124, 255, 0.1)'
      : 'rgba(244, 67, 54, 0.1)'};
`;

const EllipsisText = styled(Text)`
  display: inline-block;
  max-width: 336px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
`;
