import type { User } from './client';

export interface GetUserRes {
  data: User;
}

export interface PostSignUpReq {
  phoneNumber: string;
  name: string;
  password: string;
}

export interface PatchUserVerificationReq {
  phoneNumber: string;
  code: string;
  type: Type;
}

export interface patchChangePasswordReq {
  phoneNumber: string;
  password: string;
}

export type PostUserVerificationReq = Omit<PatchUserVerificationReq, 'code'>;

export type Type = 'SIGNUP' | 'UPDATE_PASSWORD';
