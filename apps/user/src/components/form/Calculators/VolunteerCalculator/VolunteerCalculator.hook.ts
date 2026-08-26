import { formAtom } from '@/stores';
import { useSetAtom } from 'jotai';
import type { ChangeEventHandler } from 'react';

export const useInput = () => {
  const setForm = useSetAtom(formAtom);

  const handleVolunteerTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, grade: { ...prev.grade, [name]: Number(value) } }));
  };
  return { handleVolunteerTimeChange };
};
