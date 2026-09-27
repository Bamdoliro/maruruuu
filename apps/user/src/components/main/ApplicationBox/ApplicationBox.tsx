import { ROUTES } from '@/constants/common/constants';
import { useFairListQuery } from '@/services/fair/queries';
import { formatMonthDay } from '@/utils';
import { color } from '@maru/design-system';
import { IconArrowOutward } from '@maru/icon';
import { Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

const ApplicationBox = () => {
  const router = useRouter();
  const { data: fairListData } = useFairListQuery('STUDENT_AND_PARENT');

  const fairList = (fairListData ?? [])
    .map((fair) => ({ ...fair, startDate: dayjs(fair.start) }))
    .filter(({ startDate }) => startDate.isValid())
    .sort((a, b) => a.startDate.valueOf() - b.startDate.valueOf());

  const date = Array.from(
    new Set(fairList.map(({ startDate }) => formatMonthDay(startDate))),
  ).join(', ');
  const place = Array.from(new Set(fairList.map(({ place }) => place))).join(', ');

  const handleMoveFairPage = () => {
    router.push(ROUTES.FAIR);
  };

  return (
    <StyledApplicationBox onClick={handleMoveFairPage}>
      <Row gap={8} alignItems="center">
        <Text fontType="H3" color={color.gray900}>
          입학전형 설명회 신청
        </Text>
        <IconArrowOutward width={36} height={36} color={color.maruDefault} />
      </Row>
      <Text fontType="p2" color={color.gray500}>
        {fairList.length > 0 ? (
          <>
            일시: {date} <br />
            장소: {place}
          </>
        ) : (
          '현재 등록된 입학 설명회가 없습니다.'
        )}
      </Text>
    </StyledApplicationBox>
  );
};

export default ApplicationBox;

const StyledApplicationBox = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 384px;
  height: 180px;
  padding: 28px 32px;
  background-color: ${color.white};
  border-radius: 12px;
  border: 1px solid ${color.gray200};
  cursor: pointer;
`;
