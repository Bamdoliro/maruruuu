import type { FormProfile } from '@/types/form/client';
import { atom } from 'jotai';

export const formProfileAtom = atom<FormProfile>({
  uploadUrl: '',
  downloadUrl: '',
});
