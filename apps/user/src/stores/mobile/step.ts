import type { Step } from '@/types/mobile/client';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const stepAtomState = atom<Step>({
  key: 'step',
  default: 'LOGIN',
});

export const useStepStore = () => useRecoilState(stepAtomState);
export const useStepValueStore = () => useRecoilValue(stepAtomState);
export const useSetStepStore = () => useSetRecoilState(stepAtomState);
