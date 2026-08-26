import type { FinalForm } from '@/types/form/client';
import { atom } from 'jotai';

export const finalFormAtom = atom<FinalForm>({
  fileName: '',
  mediaType: '',
  fileSize: 0,
  file: null,
});
