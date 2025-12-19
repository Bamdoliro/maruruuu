import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const schoolSearchAtomState = atom<string>({
  key: 'school-search',
  default: '',
});

export const useSchoolSearchStore = () => useRecoilState(schoolSearchAtomState);
export const useSchoolSearchValueStore = () => useRecoilValue(schoolSearchAtomState);
export const useSetSchoolSearchStore = () => useSetRecoilState(schoolSearchAtomState);
