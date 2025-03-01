import { color } from '@maru/design-system';
import { CellInput, Column, Row, Td, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import AttendanceCalculatorHeader from './AttendanceCalculatorHeader/AttendanceCalculatorHeader';
import { useFormValueStore } from '@/stores';
import { useInput } from './AttendanceCalculator.hook';

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
        <Row>
          <Td width="20%" height={56} styleType="SECONDARY">
            1학년
          </Td>
          <Td width="20%" height={56}>
            <CellInput
              name="attendance1-absenceCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance1.absenceCount}
              isError={Number(form.grade.attendance1.absenceCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
          <Td width="20%" height={56}>
            <CellInput
              name="attendance1-latenessCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance1.latenessCount}
              isError={Number(form.grade.attendance1.latenessCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
          <Td width="20%" height={56}>
            <CellInput
              name="attendance1-earlyLeaveCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance1.earlyLeaveCount}
              isError={Number(form.grade.attendance1.earlyLeaveCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
          <Td width="20%" height={56}>
            <CellInput
              name="attendance1-classAbsenceCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance1.classAbsenceCount}
              isError={Number(form.grade.attendance1.classAbsenceCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
        </Row>
        <Row>
          <Td width="20%" height={56} styleType="SECONDARY">
            2학년
          </Td>
          <Td width="20%" height={56}>
            <CellInput
              name="attendance2-absenceCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance2.absenceCount}
              isError={Number(form.grade.attendance2.absenceCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
          <Td width="20%" height={56}>
            <CellInput
              name="attendance2-latenessCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance2.latenessCount}
              isError={Number(form.grade.attendance2.latenessCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
          <Td width="20%" height={56}>
            <CellInput
              name="attendance2-earlyLeaveCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance2.earlyLeaveCount}
              isError={Number(form.grade.attendance2.earlyLeaveCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
          <Td width="20%" height={56}>
            <CellInput
              name="attendance2-classAbsenceCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance2.classAbsenceCount}
              isError={Number(form.grade.attendance2.classAbsenceCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
        </Row>
        <Row>
          <Td borderBottomLeftRadius={12} width="20%" height={56} styleType="SECONDARY">
            3학년
          </Td>
          <Td width="20%" height={56}>
            <CellInput
              name="attendance3-absenceCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance3.absenceCount}
              isError={Number(form.grade.attendance3.absenceCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
          <Td width="20%" height={56}>
            <CellInput
              name="attendance3-latenessCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance3.latenessCount}
              isError={Number(form.grade.attendance3.latenessCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
          <Td width="20%" height={56}>
            <CellInput
              name="attendance3-earlyLeaveCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance3.earlyLeaveCount}
              isError={Number(form.grade.attendance3.earlyLeaveCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
          <Td borderBottomRightRadius={12} width="20%" height={56}>
            <CellInput
              name="attendance3-classAbsenceCount"
              onChange={handleAttendanceInfoChange}
              value={form.grade.attendance3.classAbsenceCount}
              isError={Number(form.grade.attendance3.classAbsenceCount) < 0}
              readOnly={isReadOnly}
            />
          </Td>
        </Row>
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
