import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import type {
  PostSendMessageByStatusRequest,
  PostSendMessageByTypeRequest,
  PostSendMessageToAllRequest,
} from '@/types/message/remote';

export const postMessageByStatus = (params: PostSendMessageByStatusRequest) => {
  return maru.post('/message/status', params, authorization());
};

export const postMessageByType = (params: PostSendMessageByTypeRequest) => {
  return maru.post('/message/type', params, authorization());
};

export const postMessageToAll = (params: PostSendMessageToAllRequest) => {
  return maru.post('/message/all', params, authorization());
};
