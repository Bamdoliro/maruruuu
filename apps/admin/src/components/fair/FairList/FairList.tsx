import { useFairListQuery } from '@/services/fair/queries';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import FairListItem from './FairListItem/FairListItem';
import FairListHeader from './FairListHeader/FairListHeader';
import { useState } from 'react';
import { FAIR_TAP_STATUS } from '@/constants/fair/constant';

const FairList = () => {
  const [tabStatus, setTabStatus] = useState('진행 중인 신청');

  const { data: fairListData } = useFairListQuery();

  const filteredFairList = fairListData?.filter(({ status }) =>
    FAIR_TAP_STATUS[tabStatus]?.includes(status)
  );

  return (
    <StyledFairList>
      <FairListHeader selectedTab={tabStatus} handleTabClick={setTabStatus} />
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
  );
};

export default FairList;

const StyledFairList = styled.div`
  ${flex({ alignItems: 'flex-start' })}
  align-content: flex-start;
  gap: 16px;
  flex-wrap: wrap;
`;
