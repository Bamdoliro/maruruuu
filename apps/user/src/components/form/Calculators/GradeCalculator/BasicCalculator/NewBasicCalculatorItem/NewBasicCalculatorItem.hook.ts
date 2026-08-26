import { newSubjectListAtom } from '@/stores';
import { useSetAtom } from 'jotai';
import type { ChangeEventHandler } from 'react';

export const useInput = (newSubjectIndex: number) => {
  const setNewSubjectList = useSetAtom(newSubjectListAtom);

  const handleNewSubjectChange = (data: string, name: string) => {
    const value = data === '미이수' ? 'F' : data;
    setNewSubjectList((prev) => {
      const updatedData = [...prev];
      updatedData[newSubjectIndex] = {
        ...updatedData[newSubjectIndex],
        [name]: value,
      };
      return updatedData;
    });
  };

  const handleNewSubjectNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setNewSubjectList((prev) => {
      const updatedData = [...prev];
      updatedData[newSubjectIndex] = {
        ...updatedData[newSubjectIndex],
        [name]: value,
      };
      return updatedData;
    });
  };

  return { handleNewSubjectChange, handleNewSubjectNameChange };
};

export const useDeleteNewSubject = () => {
  const setNewSubjectList = useSetAtom(newSubjectListAtom);

  const handleDeleteNewSubject = (id: number) => {
    setNewSubjectList((prev) => prev.filter((item) => item.id !== id));
  };

  return { handleDeleteNewSubject };
};
