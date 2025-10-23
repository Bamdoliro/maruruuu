import { Column } from '@maru/ui';
import QualificationExaminationGradeItem from '@/components/form/FormDetail/GradesInfo/QualificationExaminationGrade/QualificationExaminationGradeItem/QualificationExaminationGradeItem';
import getQualificationExaminationAchievementLevelsGroupList from '@/components/form/FormDetail/GradesInfo/QualificationExaminationGrade/qualificationexamination.hook';
import QualificationExaminationGradeHeader from '@/components/form/FormDetail/GradesInfo/QualificationExaminationGrade/QualificationExaminationGradeHeader/QualificationExaminationGradeHeader';
import type { QualificationExaminationSubject } from '@/types/form/client';
interface GradeProps {
  subjectList: QualificationExaminationSubject[];
}

const QualificationExaminationGrade = ({ subjectList }: GradeProps) => {
  const achievementLevelsGroupList =
    getQualificationExaminationAchievementLevelsGroupList(subjectList);
  return (
    <Column>
      <QualificationExaminationGradeHeader />
      {achievementLevelsGroupList.map((item, index) => (
        <QualificationExaminationGradeItem
          subjectName={item.subjectName}
          achievementLevel={item.achievementLevels[0]}
          isLast={index === achievementLevelsGroupList.length - 1}
        />
      ))}
    </Column>
  );
};

export default QualificationExaminationGrade;
