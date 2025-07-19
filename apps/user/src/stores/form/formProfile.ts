import type { FormProfile } from '@/types/form/client';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const formProfileAtomState = atom<FormProfile>({
  key: 'form-profile-url',
  default: {
    uploadUrl: '',
    downloadUrl: '',
  },
});

export const useFormProfileStore = () => useRecoilState(formProfileAtomState);
export const useFormProfileValueStore = () => useRecoilValue(formProfileAtomState);
export const useSetFormProfileStore = () => useSetRecoilState(formProfileAtomState);
