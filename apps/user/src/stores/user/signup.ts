import type { SignUp } from '@/types/user/client';
import { atom } from 'jotai';

export const signUpAtom = atom<SignUp>({
  password_confirm: '',
  phoneNumber: '',
  password: '',
  name: '',
  code: '',
  type: 'SIGNUP',
});
