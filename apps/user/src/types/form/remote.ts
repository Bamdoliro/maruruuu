import { Form, FormStatus, School } from './client';

export interface GetFormStatusRes {
  data: FormStatus;
}

export interface GetSaveFormRes {
  data: Form;
}

export interface GetSchoolListRes {
  dataList: School[];
}
