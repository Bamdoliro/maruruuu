import { useSetmSubjectIncompleteStore, useSetSubjectListStore } from '@/stores';

const CORE_SUBJECTS = ['국어', '영어', '수학'];

export const useInput = (id: number) => {
  const setSubjectList = useSetSubjectListStore();
  const setSubjectIncomplete = useSetmSubjectIncompleteStore();

  const handleSubjectChange = (data: string, name: string) => {
    let isIncomplete = false;
    let subjectName = '';
    setSubjectList((prev) => {
      const updatedData = [...prev];
      const subject = updatedData[id];

      subjectName = subject.subjectName;

      updatedData[id] = {
        ...subject,
        [name]: data,
      };
      return updatedData;
    });

    setSubjectIncomplete((prev) => ({
      ...prev,
      [subjectName]: {
        ...prev[subjectName],
        [name === 'achievementLevel21'
          ? 'isIncomplete21'
          : name === 'achievementLevel22'
          ? 'isIncomplete22'
          : 'isIncomplete31']: isIncomplete,
      },
    }));
  };

  return { handleSubjectChange };
};
