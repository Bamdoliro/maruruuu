import { FORM } from '@/constants/form/data';
import type { Form } from '@/types/form/client';
import { atom } from 'jotai';

export const formAtom = atom<Form>({
  applicant: FORM.applicant,
  parent: FORM.parent,
  education: FORM.education,
  grade: FORM.grade,
  document: FORM.document,
  type: FORM.type,
});
