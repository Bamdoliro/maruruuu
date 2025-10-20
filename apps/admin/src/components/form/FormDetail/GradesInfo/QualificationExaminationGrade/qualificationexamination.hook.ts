import type { QualificationExaminationSubject } from '@/types/form/client';
import type { QualificationExaminationAchievementLevelsGroup } from '@/types/form/client';

const getQualificationExaminationAchievementLevelsGroupList = (
  subjectList?: QualificationExaminationSubject[]
): QualificationExaminationAchievementLevelsGroup[] => {
  if (!subjectList || subjectList.length === 0) return [];

  return subjectList.map((cur) => {
    return {
      subjectName: cur.subjectName,
      achievementLevels: [cur.achievementLevel],
    };
  });
};

export default getQualificationExaminationAchievementLevelsGroupList;
