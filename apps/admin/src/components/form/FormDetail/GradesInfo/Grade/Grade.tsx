import type { Subject } from '@/types/form/client';
import getAchievementLevelsGroupList from './grade.hook';
import { Column } from '@maru/ui';
import GradeHeader from './GradeHeader/GradeHeader';
import GradeItem from './GradeItem/GradeItem';

interface GradeProps {
  subjectList: Subject[];
}

const Grade = ({ subjectList }: GradeProps) => {
  const achievementLevelsGroupList = getAchievementLevelsGroupList(subjectList);
  return (
    <Column>
      <GradeHeader />
      {achievementLevelsGroupList.map((item, index) => (
        <GradeItem
          subjectName={item.subjectName}
          achievementLevel21={item.achievementLevels[0]}
          achievementLevel22={item.achievementLevels[1]}
          achievementLevel31={item.achievementLevels[2]}
          isLast={index === achievementLevelsGroupList.length - 1}
        />
      ))}
    </Column>
  );
};

export default Grade;
