import { useSetSubjectListStore } from '@/stores';

export const useInput = (id: number) => {
  const setSubjectList = useSetSubjectListStore();

  const handleSubjectChange = (data: string, name: string) => {
    setSubjectList((prev) => {
      const updatedData = [...prev];
      const subject = updatedData[id];

      updatedData[id] = {
        ...subject,
        [name]: data,
      };
      return updatedData;
    });
  };

  return { handleSubjectChange };
};
