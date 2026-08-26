import { formAtom } from '@/stores';
import { useSetAtom } from 'jotai';
import type { Address } from 'react-daum-postcode';

export const useOnComplete = (onClose: () => void) => {
  const setForm = useSetAtom(formAtom);

  const handleCompleteFindAddress = ({ address, zonecode }: Address) => {
    setForm((prev) => ({
      ...prev,
      parent: { ...prev.parent, address, zoneCode: zonecode },
    }));
    onClose();
  };

  return { handleCompleteFindAddress };
};
