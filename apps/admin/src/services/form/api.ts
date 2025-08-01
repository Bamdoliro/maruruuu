import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { EXPORT_EXCEL_TYPE_VALUE } from '@/constants/form/constant';
import type {
  ExportExcelType,
  FormListSortingType,
  FormListType,
} from '@/types/form/client';
import type {
  GetFormDetail,
  GetFormListRes,
  GetFormURLRes,
  PatchSecondRoundResultReq,
} from '@/types/form/remote';

export const getFormList = async (
  formListType: FormListType,
  formListSortingType?: FormListSortingType
) => {
  let url = '/forms';

  if (formListType === '검토해야 하는 원서 모아보기') {
    url = '/forms/review';
  }
  if (formListSortingType) {
    if (formListType !== '검토해야 하는 원서 모아보기') {
      const params = new URLSearchParams();
      if (formListSortingType.status) params.append('status', formListSortingType.status);
      if (formListSortingType.type) params.append('type', formListSortingType.type);
      if (formListSortingType.sort) params.append('sort', formListSortingType.sort);

      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;
    }
  }

  const { data } = await maru.get<GetFormListRes>(url, authorization());

  return data;
};

export const getSecondScoreFormat = async () => {
  const { data } = await maru.get('/forms/second-round/format', {
    ...authorization(),
    responseType: 'blob',
  });

  return data;
};

export const getExportExcel = async (exportExcelType: ExportExcelType) => {
  const { data } = await maru.get(
    `/forms/xlsx/${EXPORT_EXCEL_TYPE_VALUE[exportExcelType]}`,
    {
      ...authorization(),
      responseType: 'blob',
    }
  );

  return data;
};

export const getFormUrl = async (formIdList: number[]) => {
  const { data } = await maru.get<GetFormURLRes>(
    `/forms/form-url?id-list=${formIdList.join('%2C')}`,
    authorization()
  );

  return data;
};

export const getAllAdmissionTicket = async () => {
  const { data } = await maru.get('/forms/admission-tickets', {
    ...authorization(),
    responseType: 'blob',
  });

  return data;
};

export const getFormDetail = async (id: number) => {
  const { data } = await maru.get<GetFormDetail>(`/forms/${id}`, authorization());

  return data;
};

export const patchSecondScoreFormat = async (formData: FormData) => {
  const res = await maru.patch('/forms/second-round/score', formData, {
    ...authorization.FormData(),
    responseType: 'blob',
    validateStatus: () => true,
  });

  return res;
};

export const patchSecondRoundResult = async (
  secondRoundResultData: PatchSecondRoundResultReq
) => {
  const { data } = await maru.patch(
    '/forms/second-round/result',
    secondRoundResultData,
    authorization()
  );

  return data;
};

export const patchSecondRoundResultAuto = async () => {
  const { data } = await maru.patch('/forms/second-round/select', null, authorization());

  return data;
};
