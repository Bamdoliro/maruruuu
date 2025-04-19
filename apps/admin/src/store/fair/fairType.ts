import { atom, useRecoilState } from 'recoil';
import type { Fair } from '@/types/fair/client';

const fairTypeState = atom<Fair>({
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

const fairFormState = atom<Fair>({
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
export const useFairTypeStore = () => useRecoilState(fairTypeState)
export const useFairFormStore=()=>useRecoilState(fairFormState);