import { ROUTES } from '@/constants/common/constant';
import { FAIR_STATUS } from '@/constants/fair/constant';
import { FairStatus } from '@/types/fair/client';
import { color } from '@maru/design-system';
import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';

type StatusType = 'open' | 'closed' | 'full';

interface FairListItemProps {
  id: number;
  start: string;
  place: string;
  applicationStartDate: string;
  applicationEndDate: string;
  status: FairStatus;
}

const FairListItem = ({
  id,
  start,
  place,
  applicationStartDate,
  applicationEndDate,
  status,
}: FairListItemProps) => {
  const router = useRouter();
  const statusType: StatusType =
    status === 'APPLICATION_ENDED'
      ? 'full'
      : status === 'CLOSED' || status === 'APPLICATION_EARLY_CLOSED'
        ? 'closed'
        : 'open';

  const handleMoveFairDetail = () => {
    router.push(`${ROUTES}/${id}`);
  };

  return (
    <StyledFairListItem onClick={handleMoveFairDetail}>
      <Row justifyContent="space-between" alignItems="center">
        <Text fontType="H3" color={color.gray900}>
          {start}
        </Text>
        <ItemStatusBox status={statusType}>
          <Text fontType="context">{FAIR_STATUS[status as FairStatus]}</Text>
        </ItemStatusBox>
      </Row>
      <Column>
        <Text fontType="p2" color={color.gray500}>
          장소: {place} <br />
          신청 기한: {applicationStartDate} ~ {applicationEndDate}
        </Text>
      </Column>
    </StyledFairListItem>
  );
};
export default FairListItem;

const StyledFairListItem = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 400px;
  padding: 24px 32px;
`;

const ItemStatusBox = styled.div<{ status: StatusType }>`
  ${flex({ justifyContent: 'center' })}
  gap: 10px;
  border-radius: 100px;
  ${({ status }) => {
    switch (status) {
      case 'open':
        return `
          color: ${color.maruDefault};
          border: 1px solid ${color.maruDefault};
          background: rgba(37, 124, 255, 0.10);
        `;
      case 'closed':
        return `
          color: ${color.red};
          border: 1px solid ${color.red};
          background: rgba(244, 67, 54, 0.10);
        `;
      case 'full':
        return `
          color: ${color.gray700};
          border: 1px solid ${color.gray700};
          background: rgba(89, 91, 102, 0.10);
        `;
      default:
        return '';
    }
  }}
`;
