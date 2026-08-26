import type { Profile } from '@/types/form/client';
import { atom } from 'jotai';

export const profileAtom = atom<Profile>({
  fileName: null,
  mediaType: null,
  fileSize: null,
  file: null,
});
