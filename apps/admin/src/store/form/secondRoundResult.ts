import type { PassStatusType } from '@/types/form/client';
import { atom } from 'jotai';

export const secondRoundResultAtom = atom<Record<number, PassStatusType>>({});
