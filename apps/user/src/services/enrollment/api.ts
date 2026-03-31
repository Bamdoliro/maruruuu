import { maru } from '@/apis/instance/instance';
import type { FileDocument } from '@/types/form/remote';
import axios from 'axios';

export const postEntrollmentDocument = async (fileData: FileDocument) => {
  const { data } = await maru.post('/forms/admission-and-pledge', fileData);

  return data;
};

export const putEntrollmentDocument = async (file: File | null, url: string) => {
  const { data } = await axios.put(url, file, {
    headers: {
      'Content-Type': file?.type,
    },
  });

  return data;
};

export const patchEnter = async () => {
  const { data } = await maru.patch('/forms/enter', null);

  return data;
};
