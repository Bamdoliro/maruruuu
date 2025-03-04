import { GradeStep } from '@/types/form/client';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';

const formGradeStepAtomState = atom<GradeStep>({
  key: 'form-grade-step',
  default: '교과성적',
});

export const use성적입력StepStore = () => useRecoilState(formGradeStepAtomState);
export const useSet성적입력StepStore = () => useSetRecoilState(formGradeStepAtomState);
