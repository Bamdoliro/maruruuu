import { atom, useRecoilState } from 'recoil';

const noticeFileAtomState = atom<File[] | null>({
  key: 'notice-file',
  default: null,
});

const uploadedNoticeFileAtomState = atom<File | null>({
  key: 'uploaded-notice-file',
  default: null,
});

export const useUploadedNoticeFileStore = () =>
  useRecoilState(uploadedNoticeFileAtomState);

export const useNoticeFileStore = () => useRecoilState(noticeFileAtomState);
