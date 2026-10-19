import { atom } from 'jotai';

export const lastSavedFormAtom = atom<string | null>(null);
