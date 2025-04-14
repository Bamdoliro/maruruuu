import { Attendance } from '@/types/form/client';
import { CellInput, Column, Row, Td, Th } from '@maru/ui';

interface AttendanceStatusProps {
  attendanceRecords: {
    attendance1: Attendance;
    attendance2: Attendance;
    attendance3: Attendance;
  };
}

const AttendanceStatus = ({ attendanceRecords }: AttendanceStatusProps) => {
  const attendanceData = [
    { gradeLabel: '1학년', data: attendanceRecords.attendance1 },
    { gradeLabel: '2학년', data: attendanceRecords.attendance2 },
    { gradeLabel: '3학년', data: attendanceRecords.attendance3 },
  ];

  return (
    <Column>
      <Row>
        <Th width={140} height={56} borderTopLeftRadius={12}>
          학년
        </Th>
        <Th width={140} height={56}>
          미인정 결석
        </Th>
        <Th width={140} height={56}>
          미인정 지각
        </Th>
        <Th width={140} height={56}>
          미인정 조퇴
        </Th>
        <Th width={140} height={56} borderTopRightRadius={12}>
          미인정 결과
        </Th>
      </Row>
      {attendanceData.map((attendance, index) => (
        <Row key={index}>
          <Td
            styleType="SECONDARY"
            width={140}
            height={56}
            borderBottomLeftRadius={index === attendanceData.length - 1 ? 12 : undefined}
          >
            {attendance.gradeLabel}
          </Td>
          <Td width={140} height={56}>
            <CellInput value={attendance.data?.absenceCount} readOnly />
          </Td>
          <Td width={140} height={56}>
            <CellInput value={attendance.data?.latenessCount} readOnly />
          </Td>
          <Td width={140} height={56}>
            <CellInput value={attendance.data?.earlyLeaveCount} readOnly />
          </Td>
          <Td
            width={140}
            height={56}
            borderBottomRightRadius={index === attendanceData.length - 1 ? 12 : undefined}
          >
            <CellInput value={attendance.data?.classAbsenceCount} readOnly />
          </Td>
        </Row>
      ))}
    </Column>
  );
};

export default AttendanceStatus;
