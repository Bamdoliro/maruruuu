import { useState, useEffect, useCallback } from 'react';
import {
  isModalSuppressed,
  suppressModalForOneDay,
  removeModalSuppression,
  cleanupExpiredSuppressions,
} from '@/utils/modalSuppression';

interface UseModalSuppressionReturn {
  isSuppressed: boolean;
  suppressModal: () => void;
  resetSuppression: () => void;
  refreshSuppressionStatus: () => void;
}

export const useModalSuppression = (modalId: string): UseModalSuppressionReturn => {
  const [isSuppressed, setIsSuppressed] = useState<boolean>(false);

  const checkSuppressionStatus = useCallback(() => {
    const suppressed = isModalSuppressed(modalId);
    setIsSuppressed(suppressed);
  }, [modalId]);

  useEffect(() => {
    cleanupExpiredSuppressions();
    checkSuppressionStatus();
  }, [checkSuppressionStatus]);

  const suppressModal = useCallback(() => {
    suppressModalForOneDay(modalId);
    setIsSuppressed(true);
  }, [modalId]);

  const resetSuppression = useCallback(() => {
    removeModalSuppression(modalId);
    setIsSuppressed(false);
  }, [modalId]);

  const refreshSuppressionStatus = useCallback(() => {
    checkSuppressionStatus();
  }, [checkSuppressionStatus]);

  return {
    isSuppressed,
    suppressModal,
    resetSuppression,
    refreshSuppressionStatus,
  };
};
