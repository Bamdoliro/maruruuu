import { useNewGEDSubjectListStore } from '@/stores';
import type { Subject } from '@/types/form/client';
import { useRef } from 'react';

export const useAddNewGEDSubject = () => {
  const [newGEDSubjectList, setNewGEDSubjectList] = useNewGEDSubjectListStore();

  const newGEDSubjectIdRef = useRef(newGEDSubjectList.length);
  const handleAddNewGEDSubject = () => {
    if (newGEDSubjectList.length >= 1) {
      alert('선택과목은 하나만 추가할 수 있습니다.');
      return;
    }
    const newSubject: Subject = {
      id: newGEDSubjectIdRef.current++,
      subjectName: '',
      achievementLevel21: '미이수',
      achievementLevel22: '미이수',
      achievementLevel31: '미이수',
      score: 0,
    };
    setNewGEDSubjectList((prev) => [...prev, newSubject]);
  };

  return { handleAddNewGEDSubject };
};
