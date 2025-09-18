import type { AchievementLevel } from '@/types/form/client';
import { CellInput, Row, Td } from '@maru/ui';

interface GradeItemProps {
  subjectName: string;
  achievementLevel21: AchievementLevel;
  achievementLevel22: AchievementLevel;
  achievementLevel31: AchievementLevel;
}

const GradeItem = ({
  subjectName,
  achievementLevel21,
  achievementLevel22,
  achievementLevel31,
}: GradeItemProps) => {
  const getDisplayValue = (value: AchievementLevel) => {
    if (value === 'F') return '미이수';
    return value;
  };

  return (
    <Row height={64}>
      <Td styleType="SECONDARY" width={123} height="100%">
        {subjectName}
      </Td>
      <Td width={140} height="100%">
        <CellInput type="text" value={getDisplayValue(achievementLevel21)} readOnly />
      </Td>
      <Td width={140} height="100%">
        <CellInput type="text" value={getDisplayValue(achievementLevel22)} readOnly />
      </Td>
      <Td width={140} height="100%">
        <CellInput type="text" value={getDisplayValue(achievementLevel31)} readOnly />
      </Td>
    </Row>
  );
};

export default GradeItem;
