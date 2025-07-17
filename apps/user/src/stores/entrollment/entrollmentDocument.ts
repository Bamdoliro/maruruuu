import type { EntrollmentDocument } from '@/types/enrollment/remote';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const entrollmentDocumentAtomState = atom<EntrollmentDocument>({
  key: 'entrollment-document',
  default: {
    fileName: null,
    mediaType: null,
    fileSize: null,
    file: null,
  },
});

export const useEntrollmentDocumentStore = () =>
  useRecoilState(entrollmentDocumentAtomState);
export const useSetEntrollmentDocumentStore = () =>
  useSetRecoilState(entrollmentDocumentAtomState);
export const useEntrollmentDocumentValueStore = () =>
  useRecoilValue(entrollmentDocumentAtomState);
