import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import AttendanceCalculatorHeader from './AttendanceCalculatorHeader/AttendanceCalculatorHeader';
import { useFormValueStore } from '@/stores';
import { useInput } from './AttendanceCalculator.hook';
import AttendanceCalculatorItem from './AttendanceCalculatorItem/AttendanceCalculatorItem';
import { ATTENDANCE_GRADE, SCHEDULE } from '@/constants/form/constants';

const AttendanceCalculator = () => {
  const form = useFormValueStore();
  const { handleAttendanceInfoChange } = useInput();

  const isReadOnly = form.education.graduationType === 'QUALIFICATION_EXAMINATION';
  const scoreEndYear = SCHEDULE.원서_접수.format('YYYY');

  return (
    <StyledAttendanceCalculator>
      <Text fontType="p3" color={color.red}>
        *{scoreEndYear}.09.30까지의 출결상황을 기재해주세요. 졸업생은 졸업일 기준으로
        기재해주세요.
      </Text>
      <Column>
        <AttendanceCalculatorHeader />
        {ATTENDANCE_GRADE.map((attendanceName, index) => (
          <AttendanceCalculatorItem
            key={attendanceName}
            attendanceName={attendanceName}
            grade={form.grade}
            onChange={handleAttendanceInfoChange}
            isReadOnly={isReadOnly}
            isFirstRow={index === 0}
            isLastRow={index === 2}
          />
        ))}
      </Column>
    </StyledAttendanceCalculator>
  );
};

export default AttendanceCalculator;

const StyledAttendanceCalculator = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  gap: 16px;
`;
