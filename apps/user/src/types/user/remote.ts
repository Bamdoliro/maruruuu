import { postUserVerification } from './../../services/user/api';
import type { User } from './client';

export interface GetUserRes {
  data: User;
}

export interface PostSignUpReq {
  phoneNumber: string;
  name: string;
  password: string;
}

export interface PostUserVerificationReq {
  phoneNumber: string;
  type: Type;
}

export interface PatchUserVerificationReq {
  phoneNumber: string;
  code: string;
  type: Type;
}

export type Type = 'SIGNUP' | 'UPDATE_PASSWORD';
