import { atom } from 'jotai';

export const noticeFileAtom = atom<File[] | null>(null);

export const uploadedNoticeFileAtom = atom<File | null>(null);
