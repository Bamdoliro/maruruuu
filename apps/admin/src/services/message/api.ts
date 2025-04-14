import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';

export interface SendMessageByStatusRequest {
  title: string;
  text: string;
  status: string;
}

export interface SendMessageByTypeRequest {
  title: string;
  text: string;
  formType: 'MEISTER_TALENT' | 'REGULAR';
  isChangeToRegular: boolean;
}

export interface SendMessageToAllRequest {
  title: string;
  text: string;
}

export const sendMessageByStatus = async (params: SendMessageByStatusRequest) => {
  const { data } = await maru.post('/messages/status', params, authorization());
  return data;
};

export const sendMessageByType = async (params: SendMessageByTypeRequest) => {
  const { data } = await maru.post('/messages/type', params, authorization());
  return data;
};

export const sendMessageToAll = async (params: SendMessageToAllRequest) => {
  const { data } = await maru.post('/messages/all', params, authorization());
  return data;
};
