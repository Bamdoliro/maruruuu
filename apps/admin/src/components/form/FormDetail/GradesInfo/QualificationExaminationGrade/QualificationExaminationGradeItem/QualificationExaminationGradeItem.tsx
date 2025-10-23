import type { AchievementLevel } from '@/types/form/client';
import { CellInput, Row, Td } from '@maru/ui';

interface GradeItemProps {
  subjectName: string;
  achievementLevel: AchievementLevel;
  isLast: boolean;
}

const QualificationExaminationGradeItem = ({
  subjectName,
  achievementLevel,
  isLast,
}: GradeItemProps) => {
  return (
    <Row height={64}>
      <Td
        styleType="SECONDARY"
        width={123}
        height="100%"
        borderBottomLeftRadius={isLast ? 12 : 0}
      >
        {subjectName}
      </Td>
      <Td width={419} height="100%" borderBottomRightRadius={isLast ? 12 : 0}>
        <CellInput type="text" value={achievementLevel} readOnly />
      </Td>
    </Row>
  );
};

export default QualificationExaminationGradeItem;
