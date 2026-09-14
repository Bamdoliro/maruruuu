import type { FormStep } from '@/types/form/client';
import { atom } from 'jotai';

export const formStepAtom = atom<FormStep>('지원자정보');
