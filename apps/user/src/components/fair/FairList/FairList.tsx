import { useFairListQuery } from '@/services/fair/queries';
import styled from 'styled-components';
import FairItem from './FairItem/FairItem';
import { Text } from '@maru/ui';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constants';

interface FairListProps {
  fairType: 'STUDENT_AND_PARENT' | 'TEACHER';
  status: string[];
}

const FairList = ({ fairType, status }: FairListProps) => {
  const router = useRouter();
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

  const handleMoveApplicationPage = (id: number) => {
    if (status.includes('APPLICATION_IN_PROGRESS')) {
      if (fairType === 'STUDENT_AND_PARENT') {
        router.push(`${ROUTES.FAIR}/student/${id}`);
      } else if (fairType === 'TEACHER') {
        router.push(`${ROUTES.FAIR}/teacher/${id}`);
      }
    } else if (
      status.some((status) =>
        ['APPLICATION_CLOSED', 'APPLICATION_EARLY_CLOSED'].includes(status)
      )
    ) {
      alert('신청이 마감된 입학 설명회입니다.');
    } else if (status.includes('APPLICATION_NOT_STARTED')) {
      alert('신청이 시작되지 않았습니다. 신청 기한을 확인해주세요.');
    }
  };

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
              id={id}
              key={`fair ${index}`}
              place={place}
              start={start}
              status={status}
              applicationEndDate={applicationEndDate}
              applicationStartDate={applicationStartDate}
              onClick={() => handleMoveApplicationPage(id)}
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
