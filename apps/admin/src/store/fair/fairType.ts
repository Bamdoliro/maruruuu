import { atom } from 'recoil';
import type { Fair, FairType } from '@/types/fair/client';

export const fairTypeAtom = atom<FairType>({
  key: 'FairTypeAtom',
  default: 'STUDENT_AND_PARENT',
});

export const FairFormAtom = atom<Fair>({
  key: 'FairFormAtom',
  default: {
    start: '',
    capacity: 120,
    place: '',
    type: 'STUDENT_AND_PARENT',
    applicationStartDate: null,
    applicationEndDate: null,
  },
});
