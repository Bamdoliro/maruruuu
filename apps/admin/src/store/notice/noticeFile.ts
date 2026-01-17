import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const noticeFileAtomState = atom<File[] | null>({
  key: 'notice-file',
  default: null,
});

const uploadedNoticeFileAtomState = atom<File | null>({
  key: 'uploaded-notice-file',
  default: null,
});

export const useNoticeFileStore = () => useRecoilState(noticeFileAtomState);
export const useNoticeFileValueStore = () => useRecoilValue(noticeFileAtomState);
export const useSetNoticeFileStore = () => useSetRecoilState(noticeFileAtomState);

export const useUploadedNoticeFileStore = () =>
  useRecoilState(uploadedNoticeFileAtomState);
export const useUploadedNoticeFileValueStore = () =>
  useRecoilValue(uploadedNoticeFileAtomState);
export const useSetUploadedNoticeFileStore = () =>
  useSetRecoilState(uploadedNoticeFileAtomState);
