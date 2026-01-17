import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import type { Fair } from '@/types/fair/client';

const fairFormAtomState = atom<Fair>({
  key: 'fair-form',
  default: {
    start: '',
    capacity: 120,
    place: '',
    type: 'STUDENT_AND_PARENT',
    applicationStartDate: null,
    applicationEndDate: null,
  },
});

export const useFairFormStore = () => useRecoilState(fairFormAtomState);
export const useFairFormValueStore = () => useRecoilValue(fairFormAtomState);
export const useSetFairFormStore = () => useSetRecoilState(fairFormAtomState);
