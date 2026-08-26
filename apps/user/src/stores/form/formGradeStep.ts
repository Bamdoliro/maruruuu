import type { GradeStep } from '@/types/form/client';
import { atom } from 'jotai';

export const formGradeStepAtom = atom<GradeStep>('교과성적');
