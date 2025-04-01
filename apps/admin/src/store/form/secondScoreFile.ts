import { atom, useRecoilState } from 'recoil';

const secondScoreFileAtomState = atom<File | null>({
  key: 'second-score-file',
  default: null,
});

export const useSecondScoreFileStore = () => useRecoilState(secondScoreFileAtomState);
