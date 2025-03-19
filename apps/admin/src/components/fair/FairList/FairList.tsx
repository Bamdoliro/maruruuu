import { useFairListQuery } from '@/services/fair/queries';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import FairListItem from './FairListItem/FairListItem';

const FairList = () => {
  const { data: fairListData } = useFairListQuery();

  return (
    <StyledFairList>
      {fairListData?.map(
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
