import type { Profile } from '@/types/form/client';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const profileAtomState = atom<Profile>({
  key: 'profile',
  default: {
    fileName: null,
    mediaType: null,
    fileSize: null,
    file: null,
  },
});

export const useProfileStore = () => useRecoilState(profileAtomState);
export const useProfileValueStore = () => useRecoilValue(profileAtomState);
export const useSetProfileStore = () => useSetRecoilState(profileAtomState);
