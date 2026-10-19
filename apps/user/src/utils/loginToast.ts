type Device = 'COMPUTER' | 'MOBILE';

const STORAGE_KEY = 'login_toast_device';

export const reserveLoginToast = (device: Device) => {
  sessionStorage.setItem(STORAGE_KEY, device);
};

export const consumeLoginToast = (): Device | null => {
  const device = sessionStorage.getItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);

  return device === 'COMPUTER' || device === 'MOBILE' ? device : null;
};
