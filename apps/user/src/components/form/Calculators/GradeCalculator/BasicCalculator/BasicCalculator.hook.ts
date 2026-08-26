import { newSubjectListAtom } from '@/stores';
import { useAtom } from 'jotai';
import type { Subject } from '@/types/form/client';
import { useRef } from 'react';

export const useAddNewSubject = () => {
  const [newSubjectList, setNewSubjectList] = useAtom(newSubjectListAtom);

  const newSubjectIdRef = useRef(newSubjectList.length);
  const handleAddNewSubject = () => {
    const newSubject: Subject = {
      id: newSubjectIdRef.current++,
      subjectName: '',
      achievementLevel21: '-',
      achievementLevel22: '-',
      achievementLevel31: '-',
      score: null,
    };
    setNewSubjectList((prev) => [...prev, newSubject]);
  };

  return { handleAddNewSubject };
};
