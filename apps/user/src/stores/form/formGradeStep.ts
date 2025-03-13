import { GradeStep } from '@/types/form/client';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const formGradeStepAtomState = atom<GradeStep>({
  key: 'form-grade-step',
  default: '교과성적',
});

export const useFormGradeStepStore = () => useRecoilState(formGradeStepAtomState);
export const useSetFormGradeStepStore = () => useSetRecoilState(formGradeStepAtomState);
export const useFormGradeStepValueStore = () => useRecoilValue(formGradeStepAtomState);
