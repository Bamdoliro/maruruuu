import type { MessageForm } from '@/types/message/client';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const messageFormAtomState = atom<MessageForm>({
  key: 'message-form',
  default: {
    title: '',
    recipient: '' as MessageForm['recipient'],
    content: '',
  },
});

export const useMessageFormStore = () => useRecoilState(messageFormAtomState);
export const useMessageFormValueStore = () => useRecoilValue(messageFormAtomState);
export const useSetMessageFormStore = () => useSetRecoilState(messageFormAtomState);
