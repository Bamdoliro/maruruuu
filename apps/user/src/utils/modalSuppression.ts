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
  const settings = getModalSuppressionSettings();
  settings[modalId] = { suppressedAt, expiresAt };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const removeModalSuppression = (modalId: string): void => {
  const settings = getModalSuppressionSettings();
  delete settings[modalId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const isModalSuppressed = (modalId: string): boolean => {
  const settings = getModalSuppressionSettings();
  const modalSettings = settings[modalId];

  if (!modalSettings) return false;

  const now = Date.now();

  if (now >= modalSettings.expiresAt) {
    removeModalSuppression(modalId);
    return false;
  }

  return true;
};

export const suppressModalForOneDay = (modalId: string): void => {
  const now = Date.now();
  const oneDayLater = now + 24 * 60 * 60 * 1000;
  saveModalSuppression(modalId, now, oneDayLater);
};

export const cleanupExpiredSuppressions = (): void => {
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
};
