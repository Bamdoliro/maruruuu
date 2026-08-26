import type { Step } from '@/types/mobile/client';
import { atom } from 'jotai';

export const stepAtom = atom<Step>('LOGIN');
