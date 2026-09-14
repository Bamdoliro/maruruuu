import type { MessageForm } from '@/types/message/client';
import { atom } from 'jotai';

export const messageFormAtom = atom<MessageForm>({
  title: '',
  recipient: '' as MessageForm['recipient'],
  content: '',
});
