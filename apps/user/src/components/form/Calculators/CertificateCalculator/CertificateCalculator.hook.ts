import { formAtom } from '@/stores';
import { useSetAtom } from 'jotai';
import type { Certificate } from '@/types/form/client';
import type { ChangeEventHandler } from 'react';

export const useInput = () => {
  const setForm = useSetAtom(formAtom);

  const handleCertificateListChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, value } = e.target;

    setForm((prev) => ({
      ...prev,
      grade: {
        ...prev.grade,
        certificateList: checked
          ? [...(prev.grade.certificateList ?? []), value as Certificate]
          : prev.grade.certificateList.filter(
              (certificate) => certificate !== (value as Certificate),
            ),
      },
    }));
  };

  return { handleCertificateListChange };
};
