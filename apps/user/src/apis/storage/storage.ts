export class Storage {
  static getItem(key: string) {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  }

  static setItem(key: string, value: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  }

  static removeItem(key: string) {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }
}
