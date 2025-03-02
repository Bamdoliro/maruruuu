import { useSetFormStore } from '@/stores';
import type { AttendanceName } from '@/types/form/client';
import type { ChangeEventHandler } from 'react';

export const useInput = () => {
  const setForm = useSetFormStore();

  const handleAttendanceInfoChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const { attendanceName, countName } = JSON.parse(name);

    setForm((prev) => ({
      ...prev,
      grade: {
        ...prev.grade,
        [attendanceName]: {
          ...prev.grade[attendanceName as AttendanceName],
          [countName]: Number(value),
        },
      },
    }));
  };

  return { handleAttendanceInfoChange };
};
