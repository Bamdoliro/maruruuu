import { GED_SUBJECT_LIST } from '@/constants/form/data';
import type { Subject } from '@/types/form/client';
import { atom } from 'jotai';

export const GEDSubjectListAtom = atom<Subject[]>(GED_SUBJECT_LIST);

export const newGEDSubjectListAtom = atom<Subject[]>([]);
