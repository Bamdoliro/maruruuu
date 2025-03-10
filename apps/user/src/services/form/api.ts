import authorization from '@/apis/authorization/authorization';
import { maru } from '@/apis/instance/instance';
import { Form } from '@/types/form/client';
import {
  FormPresignedUrlData,
  GetFormStatusRes,
  GetSaveFormRes,
  GetSchoolListRes,
} from '@/types/form/remote';
import axios from 'axios';

export const getFormStatus = async () => {
  const { data } = await maru.get<GetFormStatusRes>('/form/status', authorization());

  return data;
};

export const getExportForm = async () => {
  const { data } = await maru.get('/form/export', {
    ...authorization(),
    responseType: 'blob',
  });

  return data;
};

export const getExportRecipt = async () => {
  const { data } = await maru.get('/form/proof-of-application', {
    ...authorization(),
    responseType: 'blob',
  });

  return data;
};

export const getSaveForm = async () => {
  const { data } = await maru.get<GetSaveFormRes>('/form/draft', authorization());

  return data;
};

export const postSaveForm = async (formData: Form) => {
  const { data } = await maru.post('/form/draft', formData, authorization());

  return data;
};

export const getSchoolList = async (school: string) => {
  const { data } = await maru.get<GetSchoolListRes>(`/school?q=${school}`);

  return data;
};

export const postSubmitDraftFrom = async (formData: Form) => {
  const { data } = await maru.post('/form', formData, authorization());

  return data;
};

export const patchSubmitFinalForm = async () => {
  const { data } = await maru.patch('/form', {}, authorization());

  return data;
};

export const postUploadForm = async (): Promise<FormPresignedUrlData> => {
  const { data } = await maru.post('/form/form-document', null, authorization());

  const { uploadUrl, downloadUrl, fields } = data?.data;

  return { uploadUrl, downloadUrl, fields: fields || {} } as FormPresignedUrlData;
};

export const putUploadForm = async (file: File, presignedData: FormPresignedUrlData) => {
  const { uploadUrl } = presignedData;

  const data = axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  return data;
};
