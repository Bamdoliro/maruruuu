import type { FormDocument } from '@/types/form/remote';
import { atom } from 'jotai';

export const formDocumentAtom = atom<FormDocument>({
  fileName: '',
  formUrl: '',
});
