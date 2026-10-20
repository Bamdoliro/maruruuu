import type { FormListType, FormListSortingType } from '@/types/form/client';
import { atom } from 'jotai';

export const formListTypeAtom = atom<FormListType>('모두 보기');

export const formListSortingTypeAtom = atom<FormListSortingType>({
  status: null,
  type: null,
  sort: null,
  mentoringProgram: null,
  firstRoundScoreMin: null,
  firstRoundScoreMax: null,
  totalScoreMin: null,
  totalScoreMax: null,
});
