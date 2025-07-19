import type { FinalForm } from '@/types/form/client';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const finalFormAtomState = atom<FinalForm>({
  key: 'profile',
  default: {
    fileName: '',
    mediaType: '',
    fileSize: 0,
    file: null,
  },
});

export const useFinalFormStore = () => useRecoilState(finalFormAtomState);
export const useFinalFormValueStore = () => useRecoilValue(finalFormAtomState);
export const useSetFinalFormStore = () => useSetRecoilState(finalFormAtomState);
