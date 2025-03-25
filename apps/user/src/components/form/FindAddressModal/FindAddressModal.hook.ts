import { useSetFormStore } from '@/stores';
import type { Address } from 'react-daum-postcode';

export const useOnComplete = (onClose: () => void) => {
  const setForm = useSetFormStore();

  const handleCompleteFindAddress = ({ address, zonecode }: Address) => {
    setForm((prev) => ({
      ...prev,
      parent: { ...prev.parent, address, zoneCode: zonecode },
    }));
    onClose();
  };

  return { handleCompleteFindAddress };
};
