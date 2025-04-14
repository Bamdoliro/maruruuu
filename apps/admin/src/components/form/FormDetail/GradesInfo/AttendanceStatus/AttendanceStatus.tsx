import type { Attendance } from '@/types/form/client';
import { convertToResponsive } from '@/utils';
import { CellInput, Column, Row, Td, Th } from '@maru/ui';

interface AttendanceStatusProps {
  attendanceList: Attendance[];
}

const AttendanceStatus = ({ attendanceList }: AttendanceStatusProps) => {
  const attendanceData = [
    { gradeLabel: '1학년', data: attendanceList[0] },
    { gradeLabel: '2학년', data: attendanceList[1] },
    { gradeLabel: '3학년', data: attendanceList[2] },
  ];

  const responsiveWidth = convertToResponsive(80, 140);

  return (
    <Column>
      <Row>
        <Th width={responsiveWidth} height={56} borderTopLeftRadius={12}>
          학년
        </Th>
        <Th width={responsiveWidth} height={56}>
          미인정 결석
        </Th>
        <Th width={responsiveWidth} height={56}>
          미인정 지각
        </Th>
        <Th width={responsiveWidth} height={56}>
          미인정 조퇴
        </Th>
        <Th width={responsiveWidth} height={56} borderTopRightRadius={12}>
          미인정 결과
        </Th>
      </Row>
      {attendanceData.map((attendance, index) => (
        <Row key={index}>
          <Td
            styleType="SECONDARY"
            width={responsiveWidth}
            height={56}
            borderBottomLeftRadius={index === attendanceData.length - 1 ? 12 : undefined}
          >
            {attendance.gradeLabel}
          </Td>
          <Td width={responsiveWidth} height={56}>
            <CellInput value={attendance.data?.absenceCount} readOnly />
          </Td>
          <Td width={responsiveWidth} height={56}>
            <CellInput value={attendance.data?.latenessCount} readOnly />
          </Td>
          <Td width={responsiveWidth} height={56}>
            <CellInput value={attendance.data?.earlyLeaveCount} readOnly />
          </Td>
          <Td
            width={responsiveWidth}
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
