interface ModalSuppressionData {
  suppressedAt: number;
  expiresAt: number;
}

interface ModalSuppressionSettings {
  [modalId: string]: ModalSuppressionData;
}

const STORAGE_KEY = 'modal_suppression_settings';

/**
 * 로컬 스토리지에서 모달 숨김 설정을 가져옵니다
 */
export const getModalSuppressionSettings = (): ModalSuppressionSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to parse modal suppression settings:', error);
    return {};
  }
};

/**
 * 특정 모달의 숨김 설정을 저장합니다
 */
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

/**
 * 특정 모달의 숨김 설정을 제거합니다
 */
export const removeModalSuppression = (modalId: string): void => {
  try {
    const settings = getModalSuppressionSettings();
    delete settings[modalId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to remove modal suppression settings:', error);
  }
};

/**
 * 특정 모달이 현재 숨겨져 있는지 확인합니다
 */
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

/**
 * 모달을 24시간 동안 숨김 처리합니다
 */
export const suppressModalForOneDay = (modalId: string): void => {
  const now = Date.now();
  const oneDayLater = now + 24 * 60 * 60 * 1000; // 24시간 후
  saveModalSuppression(modalId, now, oneDayLater);
};

/**
 * 모든 만료된 모달 숨김 설정을 정리합니다
 */
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
