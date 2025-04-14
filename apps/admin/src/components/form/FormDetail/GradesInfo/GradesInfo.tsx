import { SideMenu } from '@/components/common';
import { GRADES_FIELDS } from '@/constants/form/constant';
import { Column, Loader } from '@maru/ui';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import { styled } from 'styled-components';
import Grade from './Grade/Grade';
import type { Attendance, Subject } from '@/types/form/client';
import AttendanceStatus from './AttendanceStatus/AttendanceStatus';

interface GradesInfoProps {
  gradesData?: {
    gradeData: Subject[];
    attendanceData: Attendance[];
  };
}

const GradesInfo = ({ gradesData }: GradesInfoProps) => {
  const [currentGradeField, setCurrentGradeField] = useState('교과 성적');

  if (!gradesData) return <Loader />;

  return (
    <StyledGradesInfo>
      <Column gap={10}>
        {GRADES_FIELDS.map((gradeField) => (
          <SideMenu
            key={gradeField}
            isActive={currentGradeField === gradeField}
            onClick={() => setCurrentGradeField(gradeField)}
          >
            {gradeField}
          </SideMenu>
        ))}
      </Column>
      <SwitchCase
        value={currentGradeField}
        caseBy={{
          '교과 성적': <Grade subjectList={gradesData.gradeData} />,
          '출결 상황': <AttendanceStatus attendanceList={gradesData.attendanceData} />,
        }}
      />
    </StyledGradesInfo>
  );
};
export default GradesInfo;

const StyledGradesInfo = styled.div`
  display: flex;
  gap: 48px;
  width: 100%;
  padding: 48px 0;
`;
