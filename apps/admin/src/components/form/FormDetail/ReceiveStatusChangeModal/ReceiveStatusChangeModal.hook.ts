import type { ReceiveStatusValue } from '@/types/form/client';
import { useReceiveStatusChangeMutation } from '@/services/form/mutations';

export const useReceiveStatusChangeModalAction = (
  formId: number,
  status: ReceiveStatusValue | null,
  onClose: () => void
) => {
  const { changeReceiveStatus } = useReceiveStatusChangeMutation(formId, onClose);

  const handleReceiveStatusChange = () => {
    if (!status) return;
    changeReceiveStatus(status);
  };

  return { handleReceiveStatusChange };
};
