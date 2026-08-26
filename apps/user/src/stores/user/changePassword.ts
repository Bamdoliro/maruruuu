import { atom } from 'jotai';
import type { SignUp } from '@/types/user/client';

export const changePasswordAtom = atom<SignUp>({
  password_confirm: '',
  phoneNumber: '',
  password: '',
  name: '',
  code: '',
  type: 'UPDATE_PASSWORD',
});
