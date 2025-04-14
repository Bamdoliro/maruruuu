import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const correctAtomState = atom({
  key: 'correct',
  default: false,
});

export const useCorrectStore = () => useRecoilState(correctAtomState);
export const useCorrectValueStore = () => useRecoilValue(correctAtomState);
export const useSetCorrectStore = () => useSetRecoilState(correctAtomState);
