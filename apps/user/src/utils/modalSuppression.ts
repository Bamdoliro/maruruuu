interface ModalSuppressionData {
  suppressedAt: number;
  expiresAt: number;
}

interface ModalSuppressionSettings {
  [modalId: string]: ModalSuppressionData;
}

const STORAGE_KEY = 'modal_suppression_settings';

export const getModalSuppressionSettings = (): ModalSuppressionSettings => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const saveModalSuppression = (
  modalId: string,
  suppressedAt: number,
  expiresAt: number
): void => {
  try {
    const settings = getModalSuppressionSettings();
    settings[modalId] = { suppressedAt, expiresAt };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save modal suppression settings:', error);
  }
};

export const removeModalSuppression = (modalId: string): void => {
  try {
    const settings = getModalSuppressionSettings();
    delete settings[modalId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to remove modal suppression settings:', error);
  }
};

export const isModalSuppressed = (modalId: string): boolean => {
  try {
    const settings = getModalSuppressionSettings();
    const modalSettings = settings[modalId];

    if (!modalSettings) return false;

    const now = Date.now();

    // 만료되었으면 설정을 정리하고 false 반환
    if (now >= modalSettings.expiresAt) {
      removeModalSuppression(modalId);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to check modal suppression status:', error);
    return false;
  }
};

export const suppressModalForOneDay = (modalId: string): void => {
  const now = Date.now();
  const oneDayLater = now + 24 * 60 * 60 * 1000; // 24시간 후
  saveModalSuppression(modalId, now, oneDayLater);
};

export const cleanupExpiredSuppressions = (): void => {
  try {
    const settings = getModalSuppressionSettings();
    const now = Date.now();
    let hasChanges = false;

    Object.keys(settings).forEach((modalId) => {
      if (now >= settings[modalId].expiresAt) {
        delete settings[modalId];
        hasChanges = true;
      }
    });

    if (hasChanges) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  } catch (error) {
    console.warn('Failed to cleanup expired suppressions:', error);
  }
};
