import type { EntrollmentDocument } from '@/types/enrollment/remote';
import { atom } from 'jotai';

export const entrollmentDocumentAtom = atom<EntrollmentDocument>({
  fileName: null,
  mediaType: null,
  fileSize: null,
  file: null,
});
