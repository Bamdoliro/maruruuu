import {
  INFORMATION_FIRST_GRADE_KEYS,
  INFORMATION_SUBJECT,
} from '@/constants/form/constants';
import { subjectListAtom } from '@/stores';
import type { AchievementLevel, Subject } from '@/types/form/client';
import { useAtom } from 'jotai';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

type InformationFirstGradeKey = (typeof INFORMATION_FIRST_GRADE_KEYS)[number];

export const useInformationFirstGrade = () => {
  const [subjectList, setSubjectList] = useAtom(subjectListAtom);
  const [isChecked, setIsChecked] = useState(false);

  const informationSubject = subjectList.find(
    ({ subjectName }) => subjectName === INFORMATION_SUBJECT,
  );

  const hasFirstGradeScore = INFORMATION_FIRST_GRADE_KEYS.some((key) => {
    const achievementLevel = informationSubject?.[key];
    return achievementLevel !== undefined && achievementLevel !== '-';
  });

  const isOpen = isChecked || hasFirstGradeScore;

  const updateInformationSubject = (updatedSubject: Partial<Subject>) => {
    setSubjectList((prev) =>
      prev.map((subject) =>
        subject.subjectName === INFORMATION_SUBJECT
          ? { ...subject, ...updatedSubject }
          : subject,
      ),
    );
  };

  const handleHasFirstGradeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'EXISTS') {
      setIsChecked(true);
      updateInformationSubject({ achievementLevel11: 'F', achievementLevel12: 'F' });
      return;
    }

    setIsChecked(false);
    updateInformationSubject({ achievementLevel11: '-', achievementLevel12: '-' });
  };

  const handleAchievementLevelChange = (data: string, name: string) => {
    const achievementLevel = (data === '미이수' ? 'F' : data) as AchievementLevel;

    updateInformationSubject({ [name as InformationFirstGradeKey]: achievementLevel });
  };

  return {
    hasFirstGrade: isOpen ? 'EXISTS' : 'NONE',
    isOpen,
    informationSubject,
    handleHasFirstGradeChange,
    handleAchievementLevelChange,
  };
};
