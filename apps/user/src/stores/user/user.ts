import { User } from '@/types/user/client';
import { atom, useRecoilState } from 'recoil';

const userAtomState = atom<User>({
  key: 'userAtom',
  default: {
    name: '',
    authority: '',
    phoneNumber: '',
  },
});

export const useUserStore = () => useRecoilState(userAtomState);
