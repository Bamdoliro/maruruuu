import authorization from '@/apis/authorization/authorization';
import { maru } from '@/apis/instance/instance';
import type {
  GetUserRes,
  PatchUserVerificationReq,
  PostSignUpReq,
  PostUserVerificationReq,
} from '@/types/user/remote';

export const getUser = async () => {
  const { data } = await maru.get<GetUserRes>('/users', authorization());

  return data;
};

export const deleteUser = async (password: string) => {
  const { data } = await maru.delete('/users', { data: password, ...authorization() });

  return data;
};

export const postSignUp = async ({ phoneNumber, name, password }: PostSignUpReq) => {
  const { data } = await maru.post('/users', { phoneNumber, name, password });

  return data;
};

export const postRequestVerification = async ({
  phoneNumber,
  type,
}: PostUserVerificationReq) => {
  const { data } = await maru.post('/users/verification', { phoneNumber, type });

  return data;
};

export const patchVerification = async ({
  phoneNumber,
  type,
  code,
}: PatchUserVerificationReq) => {
  const { data } = await maru.patch('/users/verification', { phoneNumber, type, code });

  return data;
};
