import authorization from '@/apis/authorization/authorization';
import { maru } from '@/apis/instance/instance';
import { Form } from '@/types/form/client';
import {
  FileDocument,
  FormPresignedUrlData,
  GetFormStatusRes,
  GetSaveFormRes,
  GetSchoolListRes,
  PresignedUrlData,
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

export const postFormDocument = async (
  fileData: FileDocument
): Promise<PresignedUrlData> => {
  const { data } = await maru.post('/form/form-document', fileData, authorization());

  const { uploadUrl, downloadUrl, fields } = data?.data;

  return {
    uploadUrl,
    downloadUrl,
    fields: fields || {},
  } as PresignedUrlData;
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

export const postUploadProfileImage = async (
  fileData: FileDocument
): Promise<PresignedUrlData> => {
  const { data } = await maru.post(
    '/form/identification-picture',
    fileData,
    authorization()
  );

  const { uploadUrl, downloadUrl, fields } = data?.data;

  return {
    uploadUrl,
    downloadUrl,
    fields: fields || {},
  } as PresignedUrlData;
};

export const putProfileUpoload = async (file: File, presignedData: PresignedUrlData) => {
  const { uploadUrl } = presignedData;

  const response = await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  return response;
};

export const getUploadProfile = async (fileUrl: string) => {
  const { data } = await maru.get(fileUrl, { responseType: 'blob' });

  return URL.createObjectURL(data);
};
