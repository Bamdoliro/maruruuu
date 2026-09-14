import type { User } from '@/types/user/client';
import { atom } from 'jotai';

export const userAtom = atom<User>({
  name: '',
  authority: '',
  phoneNumber: '',
});
