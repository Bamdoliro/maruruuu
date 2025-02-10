import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';

dayjs.extend(isBetween);
dayjs.extend(utc);

interface ScheduleItemProps {
  title: string;
  date: string;
  startTime: Dayjs;
  endTime: Dayjs;
}

const ScheduleItem = ({ title, date, startTime, endTime }: ScheduleItemProps) => {
  const now = dayjs();
  const active = now.isBetween(startTime, endTime);

  return (
    <StyledScheduleItem isActive={active}>
      <Text fontType="H5" color={active ? color.maruDefault : color.gray900}>
        {title}
      </Text>
      <Text fontType="p2" color={color.gray700}>
        {date}
      </Text>
    </StyledScheduleItem>
  );
};

export default ScheduleItem;

const StyledScheduleItem = styled.div<{ isActive: boolean }>`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  width: 100%;
  height: 64px;
  flex-shrink: 0;
  background-color: ${color.gray50};
  border-radius: 12px;
  padding: 0 20px;
  border: ${(props) => (props.isActive ? `1px solid ${color.maruDefault}` : 'none')};
`;
