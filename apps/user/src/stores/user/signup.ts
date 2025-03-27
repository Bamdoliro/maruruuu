import { SignUp } from '@/types/user/client';
import { atom, useRecoilState } from 'recoil';

const signUpAtomState = atom<SignUp>({
  key: 'signUpAtom',
  default: {
    password_confirm: '',
    phoneNumber: '',
    password: '',
    name: '',
    code: '',
    type: 'SIGNUP',
  },
});

export const useSignUpStore = () => useRecoilState(signUpAtomState);
