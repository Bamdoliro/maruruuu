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

export interface FormPresignedUrlData {
  uploadUrl: string;
  downloadUrl: string;
  fields: {
    [key: string]: string | Blob;
  };
}

export interface FormDocument {
  fileName: string;
  formUrl: string;
}
