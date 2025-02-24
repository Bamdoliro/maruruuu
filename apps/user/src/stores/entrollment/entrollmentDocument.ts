import { EntrollmentDocument } from '@/types/enrollment/remote';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const entrollmentDocumentAtomState = atom<EntrollmentDocument>({
  key: 'entrollment-document',
  default: {
    fileName: '',
    formUrl: '',
  },
});

export const useSetEntrollmentDocumentStore = () =>
  useSetRecoilState(entrollmentDocumentAtomState);
export const useEntrollmentDocumentValueStore = () =>
  useRecoilValue(entrollmentDocumentAtomState);
