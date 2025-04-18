import { atom, useRecoilState } from 'recoil';
import type { SignUp } from '@/types/user/client';

const changePasswordAtomState = atom<SignUp>({
  key: 'changePasswordAtom',
  default: {
    password_confirm: '',
    phoneNumber: '',
    password: '',
    name: '',
    code: '',
    type: 'UPDATE_PASSWORD',
  },
});

export const useChangePasswordStore = () => useRecoilState(changePasswordAtomState);
