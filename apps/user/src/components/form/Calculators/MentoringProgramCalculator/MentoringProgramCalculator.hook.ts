import { formAtom } from '@/stores';
import { useSetAtom } from 'jotai';
import type { ChangeEventHandler } from 'react';

export const useInput = () => {
  const setForm = useSetAtom(formAtom);

  const handleMentoringProgramChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;

    setForm((prev) => ({
      ...prev,
      grade: {
        ...prev.grade,
        mentoringProgram: checked,
      },
    }));
  };

  return { handleMentoringProgramChange };
};
