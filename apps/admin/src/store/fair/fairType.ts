import { atom, useRecoilState } from 'recoil';
import type { Fair } from '@/types/fair/client';

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

export const useFairFormStore = () => useRecoilState(fairFormState);
