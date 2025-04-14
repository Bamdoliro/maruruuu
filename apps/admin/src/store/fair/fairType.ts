import { atom } from 'recoil';
import type { FairType } from '@/types/fair/client';
import type { FairDataInput } from '@/types/fair/client';

export const fairTypeAtom = atom<FairType>({
  key: 'fair-type',
  default: 'STUDENT_AND_PARENT',
});

export const fairFormAtom = atom<FairDataInput>({
  key: 'fair-form',
  default: {
    start: '',
    capacity: 0,
    place: '',
    type: 'STUDENT_AND_PARENT',
    applicationStartDate: '',
    applicationEndDate: '',
    date: '',
    time: '',
  },
});
