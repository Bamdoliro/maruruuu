/* eslint-disable @typescript-eslint/no-explicit-any */
import { ATTENDANCE_TYPE } from '@/constants/form/constants';
import { CellInput, Row, Td } from '@maru/ui';

interface AttendanceCalculatorItemProps {
  attendanceName: string;
  grade: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly: boolean;
  isFirstRow: boolean;
  isLastRow: boolean;
}

const AttendanceCalculatorItem = ({
  attendanceName,
  grade,
  onChange,
  isReadOnly,
  isFirstRow,
  isLastRow,
}: AttendanceCalculatorItemProps) => (
  <Row>
    <Td
      width="20%"
      height={56}
      styleType="SECONDARY"
      borderBottomLeftRadius={isFirstRow ? 12 : 0}
      borderBottomRightRadius={isLastRow ? 12 : 0}
    >
      {attendanceName === 'attendance1'
        ? '1학년'
        : attendanceName === 'attendance2'
        ? '2학년'
        : '3학년'}
    </Td>
    {ATTENDANCE_TYPE.map((countName) => (
      <Td key={countName} width="20%" height={56}>
        <CellInput
          name={JSON.stringify({ attendanceName, countName })}
          onChange={onChange}
          value={grade[attendanceName][countName]}
          isError={Number(grade[attendanceName][countName]) < 0}
          readOnly={isReadOnly}
        />
      </Td>
    ))}
  </Row>
);

export default AttendanceCalculatorItem;
