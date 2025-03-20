import { useFairListQuery } from '@/services/fair/queries';
import { styled } from 'styled-components';
import FairListItem from './FairListItem/FairListItem';
import FairListHeader from './FairListHeader/FairListHeader';
import { useState } from 'react';
import { FAIR_TAP_STATUS } from '@/constants/fair/constant';
import { Column } from '@maru/ui';

const FairList = () => {
  const [tabStatus, setTabStatus] = useState('진행 중인 신청');

  const { data: fairListData } = useFairListQuery();

  const filteredFairList = fairListData?.filter(({ status }) =>
    FAIR_TAP_STATUS[tabStatus]?.includes(status)
  );

  return (
    <Column width="100%" gap={64}>
      <FairListHeader selectedTab={tabStatus} handleTabClick={setTabStatus} />
      <StyledFairList>
        {filteredFairList?.map(
          ({ id, start, place, applicationStartDate, applicationEndDate, status }) => (
            <FairListItem
              key={id}
              id={id}
              start={start}
              place={place}
              applicationStartDate={applicationStartDate}
              applicationEndDate={applicationEndDate}
              status={status}
            />
          )
        )}
      </StyledFairList>
    </Column>
  );
};

export default FairList;

const StyledFairList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  gap: 32px;
`;
