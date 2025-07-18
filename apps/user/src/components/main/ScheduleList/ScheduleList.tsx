import { SCHEDULE } from '@/constants/form/constants';
import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import dayjs from 'dayjs';
import styled from 'styled-components';
import ScheduleItem from './ScheduleItem/ScheduleItem';

const ScheduleList = () => {
  const SCHEDULE_LIST = [
    {
      id: 1,
      title: '인터넷 원서접수',
      date: '2025년 10월 14일 09:00 ~ 17일 17:00',
      startTime: SCHEDULE.원서_접수,
      endTime: SCHEDULE.원서_접수_마감,
    },
    {
      id: 2,
      title: '1차 합격자 발표',
      date: '2025년 10월 21일 15:00',
      startTime: SCHEDULE.일차_합격_발표,
      endTime: dayjs(SCHEDULE.일차_합격_발표).endOf('day'),
    },
    {
      id: 3,
      title: '2차 전형',
      date: '2025년 10월 17일 09:30 ~ 13:00',
      startTime: SCHEDULE.이차_면접,
      endTime: SCHEDULE.이차_면접_종료,
    },
    {
      id: 4,
      title: '최종 합격자 발표',
      date: '2025년 11월 2일 15:00',
      startTime: SCHEDULE.최종_합격_발표,
      endTime: dayjs(SCHEDULE.최종_합격_발표).endOf('day'),
    },
    {
      id: 5,
      title: '입학등록기간',
      date: '2025년 12월 18일 ~ 20일',
      startTime: SCHEDULE.입학_등록,
      endTime: SCHEDULE.입학_등록_마감,
    },
  ];

  return (
    <StyledScheduleList>
      <Text fontType="H3" color={color.gray900}>
        2026학년도 신입생 입학 일정
      </Text>
      <ScheduleListBox>
        {SCHEDULE_LIST.map((item) => (
          <ScheduleItem
            key={item.id}
            title={item.title}
            date={item.date}
            startTime={item.startTime}
            endTime={item.endTime}
          />
        ))}
      </ScheduleListBox>
    </StyledScheduleList>
  );
};

export default ScheduleList;

const StyledScheduleList = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 428px;
  height: 100%;
`;

const ScheduleListBox = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  margin-top: 32px;
  gap: 16px;
`;
