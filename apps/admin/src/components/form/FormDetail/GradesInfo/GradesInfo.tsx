import { SideMenu } from '@/components/common';
import {
  GRADES_FIELDS,
  GRADES_QUALIFICATION_EXAMINATION_FIELDS,
} from '@/constants/form/constant';
import { Column, Loader } from '@maru/ui';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import { styled } from 'styled-components';
import Grade from './Grade/Grade';
import AttendanceStatus from './AttendanceStatus/AttendanceStatus';
import Volunteer from './Volunteer/Volunteer';
import Certificate from './Certificate/Certificate';
import { useFormDetailQuery } from '@/services/form/queries';
import QualificationExaminationGrade from '@/components/form/FormDetail/GradesInfo/QualificationExaminationGrade/QualificationExaminationGrade';

interface GradesInfoProps {
  id: number;
}

const GradesInfo = ({ id }: GradesInfoProps) => {
  const [currentGradeField, setCurrentGradeField] = useState('교과 성적');

  const { data: formDetailData } = useFormDetailQuery(id);
  if (!formDetailData) return <Loader />;

  const gradesData = formDetailData && {
    subjectList: formDetailData.grade.subjectList,
    attendanceList: [
      formDetailData.grade.attendance1,
      formDetailData.grade.attendance2,
      formDetailData.grade.attendance3,
    ],
    volunteerList: [
      formDetailData.grade.volunteerTime1,
      formDetailData.grade.volunteerTime2,
      formDetailData.grade.volunteerTime3,
    ],
    certificateList: formDetailData.grade.certificateList,
  };

  const isQualificationExam =
    formDetailData.education.graduationType === 'QUALIFICATION_EXAMINATION';

  const gradeFields = isQualificationExam
    ? GRADES_QUALIFICATION_EXAMINATION_FIELDS
    : GRADES_FIELDS;

  return (
    <StyledGradesInfo>
      <Column gap={10}>
        {gradeFields.map((gradeField) => (
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
          ...(isQualificationExam
            ? {
                '교과 성적': (
                  <QualificationExaminationGrade subjectList={gradesData.subjectList} />
                ),
              }
            : {
                '교과 성적': <Grade subjectList={gradesData.subjectList} />,
                '출결 상황': (
                  <AttendanceStatus attendanceList={gradesData.attendanceList} />
                ),
                '봉사 시간': <Volunteer VolunteerList={gradesData.volunteerList} />,
              }),
          자격증: <Certificate certificateList={gradesData.certificateList} />,
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
