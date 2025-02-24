import authorization from '@/apis/authorization/authorization';
import { maru } from '@/apis/instance/instance';
import type { EntrollmentDocumentPresignedUrlData } from '@/types/enrollment/client';
import axios from 'axios';

export const postEntrollmentDocument =
  async (): Promise<EntrollmentDocumentPresignedUrlData> => {
    const { data } = await maru.post('/form/admission-and-pledge', null, authorization());

    const { uploadUrl, downloadUrl, fields } = data?.data?.data || {};

    return { uploadUrl, downloadUrl, fields };
  };

export const putEntrollmentDocument = async (
  file: File,
  { uploadUrl }: EntrollmentDocumentPresignedUrlData
) => {
  const { data } = await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  return data;
};

export const patchEnter = async () => {
  const { data } = await maru.patch('/form/enter', null, authorization());

  return data;
};
