import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import AttendanceCalculatorHeader from './AttendanceCalculatorHeader/AttendanceCalculatorHeader';
import { useFormValueStore } from '@/stores';
import { useInput } from './AttendanceCalculator.hook';
import AttendanceCalculatorItem from './AttendanceCalculatorItem/AttendanceCalculatorItem';

const AttendanceCalculator = () => {
  const form = useFormValueStore();
  const { handleAttendanceInfoChange } = useInput();

  const isReadOnly = form.education.graduationType === 'QUALIFICATION_EXAMINATION';

  return (
    <StyledAttendanceCalculator>
      <Text fontType="p3" color={color.red}>
        *2024.09.30까지의 출결상황을 기재해주세요. 졸업생은 졸업일 기준으로 기재해주세요.
      </Text>
      <Column>
        <AttendanceCalculatorHeader />
        {['attendance1', 'attendance2', 'attendance3'].map((attendanceName, index) => (
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
