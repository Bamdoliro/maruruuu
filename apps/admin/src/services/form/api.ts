import { maru, maruAdmin } from '@/apis/instance/instance';
import { EXPORT_EXCEL_TYPE_VALUE } from '@/constants/form/constant';
import type {
  ExportExcelType,
  FormListSortingType,
  FormListType,
  ReceiveStatusValue,
} from '@/types/form/client';
import type {
  GetFormDetail,
  GetFormListRes,
  GetFormURLRes,
  PatchSecondRoundResultReq,
} from '@/types/form/remote';

export const getFormList = async (
  formListType: FormListType,
  formListSortingType?: FormListSortingType,
  schoolName?: string,
) => {
  let url = '/forms';

  if (formListType === '검토해야 하는 원서 모아보기') {
    url = '/forms/review';
  } else {
    const params = new URLSearchParams();
    if (formListSortingType) {
      Object.entries(formListSortingType).forEach(([key, value]) => {
        if (value !== null) params.append(key, String(value));
      });
    }
    if (schoolName) params.append('schoolName', schoolName);

    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
  }

  const { data } = await maruAdmin.get<GetFormListRes>(url);

  return data;
};

export const getSecondScoreFormat = async () => {
  const { data } = await maruAdmin.get('/forms/second-round/format', {
    responseType: 'blob',
  });

  return data;
};

export const getExportExcel = async (exportExcelType: ExportExcelType) => {
  const { data } = await maruAdmin.get(
    `/forms/xlsx/${EXPORT_EXCEL_TYPE_VALUE[exportExcelType]}`,
    {
      responseType: 'blob',
    },
  );

  return data;
};

export const getFormUrl = async (formIdList: number[]) => {
  const { data } = await maruAdmin.get<GetFormURLRes>(
    `/forms/form-url?id-list=${formIdList.join('%2C')}`,
  );

  return data;
};

export const getMergedFormPdf = async (formIdList: number[]) => {
  const { data } = await maruAdmin.get<Blob>(
    `/forms/pdf?id-list=${formIdList.join('%2C')}`,
    {
      responseType: 'blob',
    },
  );

  return data;
};

export const getAllAdmissionTicket = async () => {
  const { data } = await maruAdmin.get('/forms/admission-tickets', {
    responseType: 'blob',
  });

  return data;
};

export const getFormDetail = async (id: number) => {
  const { data } = await maru.get<GetFormDetail>(`/forms/${id}`);

  return data;
};

export const patchSecondScoreFormat = async (formData: FormData) => {
  const { data } = await maruAdmin.patch('/forms/second-round/score', formData, {
    responseType: 'blob',
    validateStatus: () => true,
  });

  return data;
};

export const patchSecondRoundResult = async (
  secondRoundResultData: PatchSecondRoundResultReq,
) => {
  const { data } = await maruAdmin.patch(
    '/forms/second-round/result',
    secondRoundResultData,
  );

  return data;
};

export const patchSecondRoundResultAuto = async () => {
  const { data } = await maruAdmin.patch('/forms/second-round/select', null);

  return data;
};

export const patchReceiveStatus = async (
  formId: number,
  receiveStatus: ReceiveStatusValue,
) => {
  const { data } = await maruAdmin.patch(`/forms/${formId}/${receiveStatus}`, {});
  return data;
};

export const getExportScoreExcel = async () => {
  const { data } = await maruAdmin.get(`/forms/xlsx/subject-grade-detail`, {
    responseType: 'blob',
  });

  return data;
};
