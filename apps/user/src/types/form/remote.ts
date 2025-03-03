import { Form, FormStatus } from './client';

export interface GetFormStatusRes {
  data: FormStatus;
}

export interface GetSaveFormRes {
  data: Form;
}