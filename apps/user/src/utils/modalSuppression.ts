import dayjs from 'dayjs';

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

  const now = dayjs().valueOf();

  if (now >= modalSettings.expiresAt) {
    removeModalSuppression(modalId);
    return false;
  }

  return true;
};

export const suppressModalForOneDay = (modalId: string): void => {
  const now = dayjs();
  const oneDayLater = now.add(1, 'day').valueOf();
  saveModalSuppression(modalId, now.valueOf(), oneDayLater);
};

export const cleanupExpiredSuppressions = (): void => {
  const settings = getModalSuppressionSettings();
  const now = dayjs().valueOf();
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
