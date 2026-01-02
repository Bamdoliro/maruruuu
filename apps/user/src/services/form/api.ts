import authorization from '@/apis/authorization/authorization';
import { maru } from '@/apis/instance/instance';
import type { Form } from '@/types/form/client';
import type {
  FileDocument,
  GetFormStatusRes,
  GetSaveFormRes,
  GetSchoolListRes,
} from '@/types/form/remote';
import axios from 'axios';

export const getFormStatus = async () => {
  const { data } = await maru.get<GetFormStatusRes>('/forms/status', authorization());

  return data;
};

export const getExportForm = async () => {
  const { data } = await maru.get('/forms/export', {
    ...authorization(),
    responseType: 'blob',
  });

  return data;
};

export const getExportReceipt = async () => {
  const { data } = await maru.get('/forms/proof-of-application', {
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
  const { data } = await maru.get<GetSchoolListRes>(`/schools?q=${school}`);

  return data;
};

export const postSubmitDraftForm = async (formData: Form) => {
  const { data } = await maru.post('/forms', formData, authorization());

  return data;
};

export const patchSubmitFinalForm = async () => {
  const { data } = await maru.patch('/forms', {}, authorization());

  return data;
};

export const postFormDocument = async (fileData: FileDocument) => {
  const { data } = await maru.post('/forms/form-document', fileData, authorization());

  return data;
};

export const putUploadForm = async (file: File | null, url: string) => {
  const data = axios.put(url, file, {
    headers: {
      'Content-Type': file?.type,
    },
  });

  return data;
};

export const postUploadProfileImage = async (fileData: FileDocument) => {
  const { data } = await maru.post(
    '/forms/identification-picture',
    fileData,
    authorization()
  );

  return data;
};

export const putProfileUpload = async (file: File | null, url: string) => {
  const response = await axios.put(url, file, {
    headers: {
      'Content-Type': file?.type,
    },
  });

  return response;
};

export const getUploadProfile = async (url: string) => {
  const { data } = await maru.get(url, { responseType: 'blob' });

  return URL.createObjectURL(data);
};

export const putFormCorrection = async (formData: Form) => {
  const { data } = await maru.put('/forms', formData, authorization());

  return data;
};
