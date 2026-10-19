import { maruAdmin } from '@/apis/instance/instance';
import type { FormStatus } from '@/types/form/client';
import type { GetFormListRes } from '@/types/form/remote';
import type {
  PostSendMessageByStatusRequest,
  PostSendMessageByTypeRequest,
  PostSendMessageToAllRequest,
} from '@/types/message/remote';

export const postMessageByStatus = async (params: PostSendMessageByStatusRequest) => {
  const { data } = await maruAdmin.post('/messages/status', params);
  return data;
};

export const postMessageByType = async (params: PostSendMessageByTypeRequest) => {
  const { data } = await maruAdmin.post('/messages/type', params);
  return data;
};

export const postMessageToAll = async (params: PostSendMessageToAllRequest) => {
  const { data } = await maruAdmin.post('/messages/all', params);
  return data;
};

export const getMessageRecipientList = async (status: FormStatus) => {
  const { data } = await maruAdmin.get<GetFormListRes>('/forms', {
    params: { status },
  });
  return data;
};
