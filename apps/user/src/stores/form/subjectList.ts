import { SUBJECT_LIST } from '@/constants/form/data';
import type { Subject } from '@/types/form/client';
import { atom } from 'jotai';

export const subjectListAtom = atom<Subject[]>(SUBJECT_LIST);

export const newSubjectListAtom = atom<Subject[]>([]);
