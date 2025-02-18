import { useFairListQuery } from '@/services/fair/queries';
import styled from 'styled-components';
import FairItem from './FairItem/FairItem';
import { Text } from '@maru/ui';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';

interface FairListProps {
  fairType: string;
  status: string[];
}

const FairList = ({ fairType, status }: FairListProps) => {
  const { data: fairListData } = useFairListQuery(fairType);

  if (!fairListData || fairListData.length === 0) {
    return (
      <StyledFairListEmpty>
        <Text fontType="H5" color={color.gray500}>
          현재 등록된 입학 설명회는 없습니다.
        </Text>
      </StyledFairListEmpty>
    );
  }

  return (
    <StyledFairList>
      {fairListData
        .filter(({ status: itemStatus }) => status.includes(itemStatus))
        .map(
          (
            { id, start, place, status, applicationStartDate, applicationEndDate },
            index
          ) => (
            <FairItem
              key={`fair ${index}`}
              id={id}
              place={place}
              start={start}
              status={status}
              applicationEndDate={applicationEndDate}
              applicationStartDate={applicationStartDate}
            />
          )
        )}
    </StyledFairList>
  );
};

export default FairList;

const StyledFairList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const StyledFairListEmpty = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 100%;
  max-width: 816px;
`;
