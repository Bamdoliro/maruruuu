import { atom } from 'jotai';
import type { Fair } from '@/types/fair/client';

export const fairFormAtom = atom<Fair>({
  start: '',
  capacity: 120,
  place: '',
  type: 'STUDENT_AND_PARENT',
  applicationStartDate: null,
  applicationEndDate: null,
});
