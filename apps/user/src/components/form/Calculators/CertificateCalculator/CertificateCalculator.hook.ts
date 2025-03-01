import { useSetFormStore } from '@/stores';
import { Certificate } from '@/types/form/client';
import type { ChangeEventHandler } from 'react';

export const useInput = () => {
  const setForm = useSetFormStore();

  const handleCertificateListChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, value } = e.target;

    setForm((prev) => ({
      ...prev,
      grade: {
        ...prev.grade,
        certificateList: checked
          ? [...(prev.grade.certificateList ?? []), value as Certificate]
          : prev.grade.certificateList.filter(
              (certificate) => certificate !== (value as Certificate)
            ),
      },
    }));
  };

  return { handleCertificateListChange };
};
