import { FairStatus, StatusType } from '@/types/fair/client';
import { flex } from '@maru/utils';
import { color } from '@maru/design-system';
import { styled } from 'styled-components';
import { Column, Loader, Row, Text } from '@maru/ui';
import { FunctionDropdown } from '@/components/common';
import { IconUpload } from '@maru/icon';
import FairTable from '../FairTable/FairTable';
import { Suspense } from 'react';
import { useFairDetailQuery } from '@/services/fair/queries';
import { formatDate } from '@/utils';
import { FAIR_ITEM_STATUS, FAIR_STATUS } from '@/constants/fair/constant';
import { useExportExcelAction } from './fairDetail.hooks';

interface FairDetailProps {
  id: number;
}

const FairDetail = ({ id }: FairDetailProps) => {
  const { data: FairDetailData } = useFairDetailQuery(id);

  const { handleExportExcelButtonClick } = useExportExcelAction(id);

  const statusType: StatusType =
    FAIR_ITEM_STATUS[FairDetailData?.status as FairStatus] ?? 'open';

  const Fairtitle = formatDate.toDayAndDateTime(FairDetailData?.start || '');
  const FairAttendeeList = FairDetailData?.attendeeList;

  return FairDetailData ? (
    <StyledFairDetail>
      <Row justifyContent="space-between">
        <Column gap={4}>
          <ItemStatusBox status={statusType}>
            {FAIR_STATUS[FairDetailData.status as FairStatus]}
          </ItemStatusBox>
          <Text fontType="H1">
            {Fairtitle}
            <br />
            입학전형 설명회 조회
          </Text>
        </Column>
        <FunctionDropdown
          data={[
            {
              icon: <IconUpload color="gray600" width={24} height={24} />,
              label: '명단 엑셀로 내보내기',
              value: 'execl',
              onClick: () => {
                handleExportExcelButtonClick(Fairtitle);
              },
            },
          ]}
        />
      </Row>
      <Suspense fallback={<Loader />}>
        <FairTable dataList={FairAttendeeList ?? []} />
      </Suspense>
    </StyledFairDetail>
  ) : null;
};

export default FairDetail;

const StyledFairDetail = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 36px;
`;

const ItemStatusBox = styled.div<{ status: StatusType }>`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  display: inline-flex;
  width: max-content;
  height: 32px;
  padding: 0 10px;
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
