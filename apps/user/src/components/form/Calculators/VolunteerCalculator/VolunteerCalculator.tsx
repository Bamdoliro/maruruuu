import { formAtom } from '@/stores';
import { useAtomValue } from 'jotai';
import { color, font } from '@maru/design-system';
import { CellInput, Column, Row, Td, Text, Th } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useInput } from './VolunteerCalculator.hook';
import { SCHEDULE } from '@/constants/common/constants';
import dayjs from 'dayjs';

const formatDate = (date: string) => dayjs(date).format('YYYY.MM.DD');
const formatPeriod = (start: string, end: string) =>
  `${formatDate(start)} ~ ${formatDate(end)}`;
const februaryEnd = (year: number) => dayjs(`${year}-02-01`).endOf('month').format();

const VolunteerCalculator = () => {
  const form = useAtomValue(formAtom);
  const { handleVolunteerTimeChange } = useInput();

  const admissionYear = SCHEDULE.원서_접수.year();
  const volunteerData = [
    {
      grade: '1학년',
      period: formatPeriod(`${admissionYear - 2}-03-01`, februaryEnd(admissionYear - 1)),
      name: 'volunteerTime1',
      value: form.grade.volunteerTime1,
    },
    {
      grade: '2학년',
      period: formatPeriod(`${admissionYear - 1}-03-01`, februaryEnd(admissionYear)),
      name: 'volunteerTime2',
      value: form.grade.volunteerTime2,
    },
    {
      grade: '3학년',
      period: formatPeriod(`${admissionYear}-03-01`, `${admissionYear}-09-30`),
      name: 'volunteerTime3',
      value: form.grade.volunteerTime3,
    },
  ];

  return (
    <StyledVolunteerCalculator>
      <Text fontType="p3" color={color.red}>
        *아래 기간에 참여한 봉사시간을 기재해주세요. 졸업생은 졸업일 기준으로
        기재해주세요.
      </Text>
      <Column>
        <Row>
          <Th borderTopLeftRadius={12} width="30%" height={56}>
            <Cell>학년 및 기간</Cell>
          </Th>
          <Th borderTopRightRadius={12} width="70%" height={56}>
            봉사시간
          </Th>
        </Row>
        {volunteerData.map(({ grade, period, name, value }, index) => (
          <Row key={name}>
            <Td
              width="30%"
              height={56}
              styleType="SECONDARY"
              borderBottomLeftRadius={index === volunteerData.length - 1 ? 12 : 0}
            >
              <Cell>
                {grade}
                <Period>{period}</Period>
              </Cell>
            </Td>
            <Td
              width="70%"
              height={56}
              borderBottomRightRadius={index === volunteerData.length - 1 ? 12 : 0}
            >
              <CellInput
                name={name}
                onChange={handleVolunteerTimeChange}
                value={value}
                isError={Number(value) < 0}
              />
              <Hour>시간</Hour>
            </Td>
          </Row>
        ))}
      </Column>
    </StyledVolunteerCalculator>
  );
};

export default VolunteerCalculator;

const StyledVolunteerCalculator = styled.div`
  ${flex({ flexDirection: 'column' })};
  width: 100%;
  gap: 16px;
`;

const Cell = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  padding: 0 20px;
`;

const Period = styled.span`
  ${font.p3}
  color: ${color.gray600};
  margin-left: 12px;
`;

const Hour = styled.p`
  ${font.p2}
  color: ${color.gray900};
  margin-left: 8px;
`;
