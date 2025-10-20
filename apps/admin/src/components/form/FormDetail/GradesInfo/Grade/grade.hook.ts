import type { AchievementLevelsGroup, Subject } from '@/types/form/client';

const getAchievementLevelsGroupList = (
  subjectList?: Subject[]
): AchievementLevelsGroup[] => {
  if (!subjectList || subjectList.length === 0) return [];
  return subjectList.reduce((acc: AchievementLevelsGroup[], cur) => {
    const existingSubject = acc.find(
      (subject) => subject.subjectName === cur.subjectName
    );

    const indexMap: Record<string, number> = {
      '2-1': 0,
      '2-2': 1,
      '3-1': 2,
    };

    const index = indexMap[`${cur.grade}-${cur.semester}`];

    if (index === undefined) {
      return acc;
    }

    if (existingSubject) {
      existingSubject.achievementLevels[index] = cur.achievementLevel;
      existingSubject.grades[index] = cur.grade;
      existingSubject.semesters[index] = cur.semester;
    } else {
      const newSubject: AchievementLevelsGroup = {
        subjectName: cur.subjectName,
        achievementLevels: [],
        grades: [],
        semesters: [],
      };

      newSubject.achievementLevels[index] = cur.achievementLevel;
      newSubject.grades[index] = cur.grade;
      newSubject.semesters[index] = cur.semester;

      acc.push(newSubject);
    }

    return acc;
  }, []);
};

export default getAchievementLevelsGroupList;
