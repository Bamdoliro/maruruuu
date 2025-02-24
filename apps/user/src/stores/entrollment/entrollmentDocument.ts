import { EntrollmentDocument } from '@/types/enrollment/remote';
import { atom, useSetRecoilState } from 'recoil';

const entrollmentDocumentAtomState = atom<EntrollmentDocument>({
  key: 'entrollment-document',
  default: {
    fileName: '',
    formUrl: '',
  },
});

export const useSetEntrollmentDocumentStore = () =>
  useSetRecoilState(entrollmentDocumentAtomState);
