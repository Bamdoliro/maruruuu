import type { AchievementLevel } from '@/types/form/client';
import { CellInput, Row, Td } from '@maru/ui';

interface GradeItemProps {
  subjectName: string;
  achievementLevel: AchievementLevel;
}

const QualificationExaminationGradeItem = ({
  subjectName,
  achievementLevel,
}: GradeItemProps) => {
  console.log(subjectName, achievementLevel);
  return (
    <Row height={64}>
      <Td styleType="SECONDARY" width={123} height="100%">
        {subjectName}
      </Td>
      <Td width={419} height="100%">
        <CellInput type="text" value={achievementLevel} readOnly />
      </Td>
    </Row>
  );
};

export default QualificationExaminationGradeItem;
